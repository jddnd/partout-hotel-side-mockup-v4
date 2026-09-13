import { beforeEach, describe, expect, it } from 'vitest'
import { applications } from '../../data/mock/applications'
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
    for (const application of applications) {
      const result = declineMockApplication(application.id)
      expect(result.kind).toBe('conflict')
      expect(getPersistedApplicationDecline(application.id)).toBeUndefined()
    }
  })
})
