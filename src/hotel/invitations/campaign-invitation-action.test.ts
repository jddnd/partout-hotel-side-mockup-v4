import { beforeEach, describe, expect, it } from 'vitest'
import { inviteTalentToCampaign } from './campaign-invitation-action'

beforeEach(() => window.localStorage.clear())

describe('invite talent action', () => {
  it('persists a pending invitation and returns it idempotently', () => {
    const first = inviteTalentToCampaign({
      creatorId: 'daniel-kahn',
      campaignId: 'coastal-escape',
      createdAt: '2026-09-14T00:00:00.000Z',
    })

    expect(first.kind).toBe('created')
    if (first.kind === 'created') {
      expect(first.invitation.status).toBe('PENDING')
      expect(first.invitation.respondBy).toBeNull()
    }

    const second = inviteTalentToCampaign({
      creatorId: 'daniel-kahn',
      campaignId: 'coastal-escape',
      createdAt: '2026-09-14T00:05:00.000Z',
    })

    expect(second.kind).toBe('already-pending')
    if (first.kind === 'created' && second.kind === 'already-pending') {
      expect(second.invitation.id).toBe(first.invitation.id)
      expect(second.invitation.createdAt).toBe(first.invitation.createdAt)
    }
  })

  it('does not create an invitation over an existing application', () => {
    const result = inviteTalentToCampaign({
      creatorId: 'sofie-larsen',
      campaignId: 'coastal-escape',
      createdAt: '2026-09-14T00:00:00.000Z',
    })

    expect(result).toEqual({ kind: 'conflict', reason: 'application-already-exists' })
  })
})
