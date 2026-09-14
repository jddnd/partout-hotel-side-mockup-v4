import { beforeEach, describe, expect, it } from 'vitest'
import { applications } from '../../data/mock/applications'
import { collaborations } from '../../data/mock/collaborations'
import {
  getApplicationHoldReceipt,
  writeApplicationHoldReceipt,
} from './application-decision-storage'
import { declineMockApplication, getPersistedApplicationDecline } from './application-decline-action'

describe('shared application decline action', () => {
  beforeEach(() => window.localStorage.clear())

  it('refuses to decline a mock application that already sourced a collaboration', () => {
    const application = applications[0]

    const result = declineMockApplication(application.id)

    expect(result.kind).toBe('conflict')
    if (result.kind === 'conflict') {
      expect(result.reason).toBe('application-already-approved')
    }
    expect(getPersistedApplicationDecline(application.id)).toBeUndefined()
  })

  it('does not create a decline receipt for any currently approved application', () => {
    const approvedApplicationIds = new Set(
      collaborations.flatMap((collaboration) =>
        collaboration.sourceApplicationId ? [collaboration.sourceApplicationId] : [],
      ),
    )

    for (const application of applications.filter((candidate) => approvedApplicationIds.has(candidate.id))) {
      const result = declineMockApplication(application.id)
      expect(result.kind).toBe('conflict')
      expect(getPersistedApplicationDecline(application.id)).toBeUndefined()
    }
  })

  it('clears a private Hold when the pending Application is declined', () => {
    const applicationId = 'culinary-journey-anna-berg'
    writeApplicationHoldReceipt({ applicationId })

    const result = declineMockApplication(applicationId)

    expect(result.kind).toBe('declined')
    expect(getPersistedApplicationDecline(applicationId)).toEqual({ applicationId })
    expect(getApplicationHoldReceipt(applicationId)).toBeUndefined()
  })
})
