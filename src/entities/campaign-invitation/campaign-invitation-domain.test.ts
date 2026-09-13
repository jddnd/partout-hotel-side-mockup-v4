import { describe, expect, it } from 'vitest'
import { campaignInvitations } from '../../data/mock/campaign-invitations'
import { campaigns } from '../../data/mock/campaigns'
import { creators } from '../../data/mock/creators'
import { relationships } from '../../data/mock/relationships'
import {
  acceptCampaignInvitation,
  cancelCampaignInvitation,
  declineCampaignInvitation,
  expireCampaignInvitation,
} from './campaign-invitation'
import type { HotelCampaignInvitation } from './campaign-invitation.types'

const pendingFixture: HotelCampaignInvitation = {
  id: 'invitation-fixture-coastal-escape-sofie-larsen',
  creatorId: 'sofie-larsen',
  campaignId: 'coastal-escape',
  status: 'PENDING',
  createdAt: '2026-09-13T12:00:00Z',
  respondBy: null,
}

describe('campaign invitation domain', () => {
  const creatorIds = new Set(creators.map((creator) => creator.id))
  const campaignIds = new Set(campaigns.map((campaign) => campaign.id))

  it('keeps canonical invitation records tied to valid creators and campaigns', () => {
    const invitationIds = new Set(campaignInvitations.map((invitation) => invitation.id))
    expect(invitationIds.size).toBe(campaignInvitations.length)

    for (const invitation of campaignInvitations) {
      expect(creatorIds.has(invitation.creatorId)).toBe(true)
      expect(campaignIds.has(invitation.campaignId)).toBe(true)
    }
  })

  it('accepts a pending invitation into a collaboration without creating a stay', () => {
    const relationship = relationships.find((candidate) => candidate.creatorId === pendingFixture.creatorId)
    expect(relationship).toBeDefined()

    const result = acceptCampaignInvitation({
      invitation: pendingFixture,
      relationshipId: relationship!.id,
      respondedAt: '2026-09-13T13:00:00Z',
    })

    expect(result.invitation.status).toBe('ACCEPTED')
    expect(result.invitation.respondedAt).toBe('2026-09-13T13:00:00Z')
    expect(result.invitation.respondBy).toBeNull()
    expect(result.collaboration.creatorId).toBe(pendingFixture.creatorId)
    expect(result.collaboration.campaignId).toBe(pendingFixture.campaignId)
    expect(result.collaboration.relationshipId).toBe(relationship!.id)
    expect(result.collaboration.sourceCampaignInvitationId).toBe(pendingFixture.id)
    expect(result.collaboration.sourceApplicationId).toBeUndefined()
    expect(result.collaboration.stayId).toBeUndefined()
  })

  it('keeps decline, cancel and expiry as invitation outcomes rather than collaborations', () => {
    const declined = declineCampaignInvitation(pendingFixture, '2026-09-13T13:00:00Z')
    const cancelled = cancelCampaignInvitation(pendingFixture, '2026-09-13T13:00:00Z')
    const expired = expireCampaignInvitation(pendingFixture)

    expect(declined.status).toBe('DECLINED')
    expect(declined.respondedAt).toBe('2026-09-13T13:00:00Z')
    expect(cancelled.status).toBe('CANCELLED')
    expect(cancelled.cancelledAt).toBe('2026-09-13T13:00:00Z')
    expect(expired.status).toBe('EXPIRED')
    expect(expired.respondedAt).toBeUndefined()
    expect(expired.cancelledAt).toBeUndefined()
  })

  it.each(['ACCEPTED', 'DECLINED', 'CANCELLED', 'EXPIRED'] as const)(
    'does not allow a closed %s invitation to transition again',
    (status) => {
      const closedInvitation: HotelCampaignInvitation = {
        ...pendingFixture,
        status,
        ...(status === 'ACCEPTED' || status === 'DECLINED' ? { respondedAt: '2026-09-13T13:00:00Z' } : {}),
        ...(status === 'CANCELLED' ? { cancelledAt: '2026-09-13T13:00:00Z' } : {}),
      }

      expect(() => expireCampaignInvitation(closedInvitation)).toThrow('campaign_invitation_not_pending')
    },
  )
})
