import { beforeEach, describe, expect, it } from 'vitest'
import { applications } from '../../data/mock/applications'
import { approveMockApplication, getPersistedApplicationApproval } from './application-approval-action'
import {
  getApplicationHoldReceipt,
  writeApplicationDeclineReceipt,
  writeApplicationHoldReceipt,
} from './application-decision-storage'

describe('shared application approval action', () => {
  beforeEach(() => window.localStorage.clear())

  it('persists the canonical collaboration receipt for an existing approved application', () => {
    const application = applications[0]

    const result = approveMockApplication(application.id)

    expect(result.kind).toBe('already-approved')
    expect(result.collaboration.sourceApplicationId).toBe(application.id)
    expect(getPersistedApplicationApproval(application.id)?.collaboration.id).toBe(result.collaboration.id)
  })

  it('remains idempotent when the same application is accepted again', () => {
    const application = applications[0]

    const first = approveMockApplication(application.id)
    const second = approveMockApplication(application.id)

    expect(first.collaboration.id).toBe(second.collaboration.id)
    expect(getPersistedApplicationApproval(application.id)?.collaboration.id).toBe(first.collaboration.id)
  })

  it('does not approve an application after a persisted decline', () => {
    const application = applications[0]
    writeApplicationDeclineReceipt({ applicationId: application.id })

    expect(() => approveMockApplication(application.id)).toThrow('application_already_declined')
    expect(getPersistedApplicationApproval(application.id)).toBeUndefined()
  })

  it('clears a private Hold when the pending Application is accepted', () => {
    const applicationId = 'culinary-journey-anna-berg'
    writeApplicationHoldReceipt({ applicationId })

    const result = approveMockApplication(applicationId)

    expect(result.kind).toBe('approved')
    expect(result.collaboration.sourceApplicationId).toBe(applicationId)
    expect(getApplicationHoldReceipt(applicationId)).toBeUndefined()
  })
})
