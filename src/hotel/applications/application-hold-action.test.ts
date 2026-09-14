import { beforeEach, describe, expect, it } from 'vitest'
import { applications } from '../../data/mock/applications'
import { getApplicationApprovalReceipt, getApplicationDeclineReceipt, writeApplicationDeclineReceipt } from './application-decision-storage'
import {
  canHoldMockApplication,
  getPersistedApplicationHold,
  toggleMockApplicationHold,
} from './application-hold-action'

const pendingApplicationId = 'culinary-journey-anna-berg'

describe('shared application Hold action', () => {
  beforeEach(() => window.localStorage.clear())

  it('holds and releases the grounded pending Application without creating a decision or Collaboration receipt', () => {
    expect(applications.some((application) => application.id === pendingApplicationId)).toBe(true)
    expect(canHoldMockApplication(pendingApplicationId)).toBe(true)

    expect(toggleMockApplicationHold(pendingApplicationId)).toEqual({
      kind: 'held',
      applicationId: pendingApplicationId,
    })
    expect(getPersistedApplicationHold(pendingApplicationId)).toEqual({ applicationId: pendingApplicationId })
    expect(getApplicationApprovalReceipt(pendingApplicationId)).toBeUndefined()
    expect(getApplicationDeclineReceipt(pendingApplicationId)).toBeUndefined()

    expect(toggleMockApplicationHold(pendingApplicationId)).toEqual({
      kind: 'released',
      applicationId: pendingApplicationId,
    })
    expect(getPersistedApplicationHold(pendingApplicationId)).toBeUndefined()
  })

  it('refuses Hold for an Application that already sourced a Collaboration', () => {
    const approvedApplicationId = 'coastal-escape-sofie-larsen'

    expect(canHoldMockApplication(approvedApplicationId)).toBe(false)
    expect(toggleMockApplicationHold(approvedApplicationId)).toEqual({
      kind: 'conflict',
      applicationId: approvedApplicationId,
      reason: 'application-already-approved',
    })
    expect(getPersistedApplicationHold(approvedApplicationId)).toBeUndefined()
  })

  it('refuses Hold after a pending Application is declined', () => {
    writeApplicationDeclineReceipt({ applicationId: pendingApplicationId })

    expect(canHoldMockApplication(pendingApplicationId)).toBe(false)
    expect(toggleMockApplicationHold(pendingApplicationId)).toEqual({
      kind: 'conflict',
      applicationId: pendingApplicationId,
      reason: 'application-already-declined',
    })
  })
})
