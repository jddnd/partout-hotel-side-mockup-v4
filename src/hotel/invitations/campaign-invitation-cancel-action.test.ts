import { beforeEach, describe, expect, it } from 'vitest'
import { collaborations } from '../../data/mock/collaborations'
import type { HotelCampaignInvitation } from '../../entities/campaign-invitation/campaign-invitation.types'
import { inviteTalentToCampaign } from './campaign-invitation-action'
import { cancelMockCampaignInvitation } from './campaign-invitation-cancel-action'
import { getMockCampaignInvitations, saveMockCampaignInvitation } from './campaign-invitation-storage'

beforeEach(() => window.localStorage.clear())

describe('campaign invitation cancellation action', () => {
  it('cancels a pending invitation without creating a collaboration', () => {
    const created = inviteTalentToCampaign({
      creatorId: 'daniel-kahn',
      campaignId: 'coastal-escape',
      createdAt: '2026-09-13T20:00:00.000Z',
    })

    expect(created.kind).toBe('created')
    if (created.kind !== 'created') throw new Error('expected_created_invitation')

    const result = cancelMockCampaignInvitation(created.invitation.id, '2026-09-13T20:30:00.000Z')

    expect(result.kind).toBe('cancelled')
    expect(result.invitation.status).toBe('CANCELLED')
    expect(result.invitation.cancelledAt).toBe('2026-09-13T20:30:00.000Z')
    expect(
      getMockCampaignInvitations([]).find((candidate) => candidate.id === created.invitation.id)?.status,
    ).toBe('CANCELLED')
    expect(
      collaborations.some((collaboration) => collaboration.sourceCampaignInvitationId === created.invitation.id),
    ).toBe(false)
  })

  it('is idempotent when the same cancelled invitation is cancelled again', () => {
    const created = inviteTalentToCampaign({
      creatorId: 'daniel-kahn',
      campaignId: 'coastal-escape',
      createdAt: '2026-09-13T20:00:00.000Z',
    })

    if (created.kind !== 'created') throw new Error('expected_created_invitation')

    const first = cancelMockCampaignInvitation(created.invitation.id, '2026-09-13T20:30:00.000Z')
    const second = cancelMockCampaignInvitation(created.invitation.id, '2026-09-13T21:00:00.000Z')

    expect(first.kind).toBe('cancelled')
    expect(second.kind).toBe('already-cancelled')
    expect(second.invitation.cancelledAt).toBe('2026-09-13T20:30:00.000Z')
  })

  it.each(['ACCEPTED', 'DECLINED', 'EXPIRED'] as const)(
    'refuses to cancel a terminal %s invitation',
    (status) => {
      const invitation: HotelCampaignInvitation = {
        id: `invitation-terminal-${status.toLowerCase()}`,
        creatorId: 'daniel-kahn',
        campaignId: 'coastal-escape',
        status,
        createdAt: '2026-09-13T20:00:00.000Z',
        respondBy: null,
      }
      expect(saveMockCampaignInvitation(invitation)).toBe(true)

      const result = cancelMockCampaignInvitation(invitation.id, '2026-09-13T21:00:00.000Z')

      expect(result.kind).toBe('conflict')
      expect(result.invitation.status).toBe(status)
    },
  )
})
