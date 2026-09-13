import { beforeEach, describe, expect, it } from 'vitest'
import { applications } from '../../data/mock/applications'
import { approveMockApplication, getPersistedApplicationApproval } from './application-approval-action'

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
})
