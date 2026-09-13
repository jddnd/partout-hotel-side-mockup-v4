import { describe, expect, it } from 'vitest'
import type { HotelCollaboration } from '../../entities/collaboration/collaboration.types'
import type { HotelApplication } from './applications.types'
import { declineApplication } from './application-decline'

const application: HotelApplication = {
  id: 'campaign-test-creator-test',
  creatorId: 'creator-test',
  campaignId: 'campaign-test',
  campaignName: 'Test campaign',
  requestedDates: 'Jun 1–3',
  pitch: 'Test pitch',
  fitScore: '90%',
}

const approvedCollaboration: HotelCollaboration = {
  id: 'collaboration-test',
  creatorId: 'creator-test',
  relationshipId: 'relationship-test',
  campaignId: 'campaign-test',
  sourceApplicationId: application.id,
}

describe('application decline workflow', () => {
  it('declines a clean pending application without creating collaboration output', () => {
    const result = declineApplication({ application, collaborations: [], alreadyDeclined: false })

    expect(result).toEqual({ kind: 'declined', applicationId: application.id })
    expect('collaboration' in result).toBe(false)
  })

  it('is idempotent once the application is already declined', () => {
    const result = declineApplication({ application, collaborations: [], alreadyDeclined: true })

    expect(result).toEqual({ kind: 'already-declined', applicationId: application.id })
  })

  it('refuses to decline an application that already sourced a collaboration', () => {
    const result = declineApplication({
      application,
      collaborations: [approvedCollaboration],
      alreadyDeclined: false,
    })

    expect(result.kind).toBe('conflict')
    if (result.kind === 'conflict') {
      expect(result.reason).toBe('application-already-approved')
      expect(result.collaboration.id).toBe(approvedCollaboration.id)
    }
  })

  it('refuses ambiguous same creator and campaign participation', () => {
    const unsourcedCollaboration: HotelCollaboration = {
      ...approvedCollaboration,
      id: 'collaboration-unsourced',
      sourceApplicationId: undefined,
    }

    const result = declineApplication({
      application,
      collaborations: [unsourcedCollaboration],
      alreadyDeclined: false,
    })

    expect(result.kind).toBe('conflict')
    if (result.kind === 'conflict') {
      expect(result.reason).toBe('existing-collaboration-without-application-provenance')
    }
  })
})
