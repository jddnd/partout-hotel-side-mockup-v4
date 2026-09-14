import { applications } from '../../data/mock/applications'
import { collaborations } from '../../data/mock/collaborations'
import {
  clearApplicationHoldReceipt,
  getApplicationDeclineReceipt,
  getApplicationHoldReceipt,
  readApplicationApprovalReceipts,
  writeApplicationHoldReceipt,
} from './application-decision-storage'

export type ApplicationHoldConflictReason =
  | 'application-already-approved'
  | 'application-already-declined'
  | 'existing-collaboration-without-application-provenance'

export type ApplicationHoldResult =
  | Readonly<{ kind: 'held'; applicationId: string }>
  | Readonly<{ kind: 'released'; applicationId: string }>
  | Readonly<{ kind: 'conflict'; applicationId: string; reason: ApplicationHoldConflictReason }>

function getHoldConflictReason(applicationId: string): ApplicationHoldConflictReason | undefined {
  const application = applications.find((candidate) => candidate.id === applicationId)
  if (!application) return undefined

  const persistedCollaborations = readApplicationApprovalReceipts().map((receipt) => receipt.collaboration)
  const allCollaborations = [...collaborations, ...persistedCollaborations]

  if (allCollaborations.some((collaboration) => collaboration.sourceApplicationId === application.id)) {
    return 'application-already-approved'
  }

  if (
    allCollaborations.some(
      (collaboration) =>
        collaboration.creatorId === application.creatorId && collaboration.campaignId === application.campaignId,
    )
  ) {
    return 'existing-collaboration-without-application-provenance'
  }

  if (getApplicationDeclineReceipt(application.id)) {
    return 'application-already-declined'
  }

  return undefined
}

export function getPersistedApplicationHold(applicationId: string) {
  return getApplicationHoldReceipt(applicationId)
}

export function canHoldMockApplication(applicationId: string) {
  return applications.some((candidate) => candidate.id === applicationId) && !getHoldConflictReason(applicationId)
}

export function toggleMockApplicationHold(applicationId: string): ApplicationHoldResult {
  const application = applications.find((candidate) => candidate.id === applicationId)
  if (!application) throw new Error('application_not_found')

  const conflictReason = getHoldConflictReason(applicationId)
  if (conflictReason) {
    return { kind: 'conflict', applicationId, reason: conflictReason }
  }

  if (getApplicationHoldReceipt(applicationId)) {
    clearApplicationHoldReceipt(applicationId)
    return { kind: 'released', applicationId }
  }

  writeApplicationHoldReceipt({ applicationId })
  return { kind: 'held', applicationId }
}
