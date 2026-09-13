import { applications } from '../../data/mock/applications'
import { collaborations } from '../../data/mock/collaborations'
import { getCreatorRelationship } from '../../data/mock/relationships'
import { approveApplication, type ApplicationApprovalResult } from './application-approval'
import {
  getApplicationApprovalReceipt,
  getApplicationDeclineReceipt,
  readApplicationApprovalReceipts,
  writeApplicationApprovalReceipt,
} from './application-decision-storage'

export function getPersistedApplicationApproval(applicationId: string) {
  return getApplicationApprovalReceipt(applicationId)
}

export function approveMockApplication(applicationId: string): ApplicationApprovalResult {
  const application = applications.find((candidate) => candidate.id === applicationId)
  if (!application) throw new Error('application_not_found')

  if (getApplicationDeclineReceipt(applicationId)) {
    throw new Error('application_already_declined')
  }

  const relationship = getCreatorRelationship(application.creatorId)
  if (!relationship) throw new Error('application_relationship_not_found')

  const persistedCollaborations = readApplicationApprovalReceipts().map((receipt) => receipt.collaboration)
  const result = approveApplication({
    application,
    relationship,
    collaborations: [...collaborations, ...persistedCollaborations],
  })

  if (result.kind === 'conflict') {
    throw new Error(result.reason)
  }

  writeApplicationApprovalReceipt({ applicationId, collaboration: result.collaboration })
  return result
}
