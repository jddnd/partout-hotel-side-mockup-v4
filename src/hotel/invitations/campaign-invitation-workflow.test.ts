import { describe, expect, it } from 'vitest'
import { applications } from '../../data/mock/applications'
import { campaigns } from '../../data/mock/campaigns'
import type { HotelCampaignInvitation } from '../../entities/campaign-invitation/campaign-invitation.types'
import { inviteCreatorToCampaign } from './campaign-invitation-workflow'

describe('campaign invitation workflow', () => {
  it('creates a pending invitation without creating collaboration state', () => {
    const campaign = campaigns.find((candidate) => candidate.id === 'coastal-escape')!
    const result = inviteCreatorToCampaign({
      campaign,
      creatorId: 'daniel-kahn',
      applications,
      invitations: [],
      createdAt: '2026-09-14T00:00:00.000Z',
    })

    expect(result.kind).toBe('created')
    if (result.kind === 'created') {
      expect(result.invitation).toEqual({
        id: 'campaign-invitation-coastal-escape-daniel-kahn',
        creatorId: 'daniel-kahn',
        campaignId: 'coastal-escape',
        status: 'PENDING',
        createdAt: '2026-09-14T00:00:00.000Z',
        respondBy: null,
      })
    }
  })

  it('returns the same pending invitation instead of duplicating it', () => {
    const campaign = campaigns.find((candidate) => candidate.id === 'coastal-escape')!
    const pending: HotelCampaignInvitation = {
      id: 'existing-pending',
      creatorId: 'daniel-kahn',
      campaignId: campaign.id,
      status: 'PENDING',
      createdAt: '2026-09-13T20:00:00.000Z',
      respondBy: null,
    }

    const result = inviteCreatorToCampaign({
      campaign,
      creatorId: 'daniel-kahn',
      applications,
      invitations: [pending],
      createdAt: '2026-09-14T00:00:00.000Z',
    })

    expect(result).toEqual({ kind: 'already-pending', invitation: pending })
  })

  it('blocks an invitation when the creator already has an application for the campaign', () => {
    const campaign = campaigns.find((candidate) => candidate.id === 'coastal-escape')!
    const result = inviteCreatorToCampaign({
      campaign,
      creatorId: 'sofie-larsen',
      applications,
      invitations: [],
      createdAt: '2026-09-14T00:00:00.000Z',
    })

    expect(result).toEqual({ kind: 'conflict', reason: 'application-already-exists' })
  })

  it('does not reopen a closed invitation', () => {
    const campaign = campaigns.find((candidate) => candidate.id === 'coastal-escape')!
    const closed: HotelCampaignInvitation = {
      id: 'closed-invitation',
      creatorId: 'daniel-kahn',
      campaignId: campaign.id,
      status: 'DECLINED',
      createdAt: '2026-09-13T20:00:00.000Z',
      respondBy: null,
      respondedAt: '2026-09-13T21:00:00.000Z',
    }

    const result = inviteCreatorToCampaign({
      campaign,
      creatorId: 'daniel-kahn',
      applications,
      invitations: [closed],
      createdAt: '2026-09-14T00:00:00.000Z',
    })

    expect(result).toEqual({
      kind: 'conflict',
      reason: 'campaign-invitation-not-pending',
      invitation: closed,
    })
  })

  it('does not invite into a campaign that is not accepting participation', () => {
    const campaign = campaigns.find((candidate) => candidate.id === 'family-getaway')!
    const result = inviteCreatorToCampaign({
      campaign,
      creatorId: 'daniel-kahn',
      applications,
      invitations: [],
      createdAt: '2026-09-14T00:00:00.000Z',
    })

    expect(result).toEqual({ kind: 'conflict', reason: 'campaign-not-accepting-participation' })
  })
})
