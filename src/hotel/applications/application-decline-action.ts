import { applications } from '../../data/mock/applications'
import { collaborations } from '../../data/mock/collaborations'
import { declineApplication, type ApplicationDeclineResult } from './application-decline'
import {
  clearApplicationHoldReceipt,
  getApplicationDeclineReceipt,
  readApplicationApprovalReceipts,
  writeApplicationDeclineReceipt,
} from './application-decision-storage'

export function getPersistedApplicationDecline(applicationId: string) {
  return getApplicationDeclineReceipt(applicationId)
}

export function declineMockApplication(applicationId: string): ApplicationDeclineResult {
  const application = applications.find((candidate) => candidate.id === applicationId)
  if (!application) throw new Error('application_not_found')

  const persistedCollaborations = readApplicationApprovalReceipts().map((receipt) => receipt.collaboration)
  const result = declineApplication({
    application,
    collaborations: [...collaborations, ...persistedCollaborations],
    alreadyDeclined: Boolean(getApplicationDeclineReceipt(applicationId)),
  })

  if (result.kind === 'declined') {
    clearApplicationHoldReceipt(applicationId)
    writeApplicationDeclineReceipt({ applicationId })
  } else if (result.kind === 'already-declined') {
    clearApplicationHoldReceipt(applicationId)
  }

  return result
}
