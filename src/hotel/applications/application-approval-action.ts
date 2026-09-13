import { applications } from '../../data/mock/applications'
import { collaborations } from '../../data/mock/collaborations'
import { getCreatorRelationship } from '../../data/mock/relationships'
import type { HotelCollaboration } from '../../entities/collaboration/collaboration.types'
import { approveApplication, type ApplicationApprovalResult } from './application-approval'

const STORAGE_KEY = 'partout.hotel.application-approvals.v1'

type ApplicationApprovalReceipt = Readonly<{
  applicationId: string
  collaboration: HotelCollaboration
}>

function readReceipts(): ReadonlyArray<ApplicationApprovalReceipt> {
  if (typeof window === 'undefined') return []

  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '[]')
    return Array.isArray(parsed) ? (parsed as ReadonlyArray<ApplicationApprovalReceipt>) : []
  } catch {
    return []
  }
}

function writeReceipt(receipt: ApplicationApprovalReceipt) {
  if (typeof window === 'undefined') return

  const remaining = readReceipts().filter((candidate) => candidate.applicationId !== receipt.applicationId)
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...remaining, receipt]))
}

export function getPersistedApplicationApproval(applicationId: string) {
  return readReceipts().find((receipt) => receipt.applicationId === applicationId)
}

export function approveMockApplication(applicationId: string): ApplicationApprovalResult {
  const application = applications.find((candidate) => candidate.id === applicationId)
  if (!application) throw new Error('application_not_found')

  const relationship = getCreatorRelationship(application.creatorId)
  if (!relationship) throw new Error('application_relationship_not_found')

  const persistedCollaborations = readReceipts().map((receipt) => receipt.collaboration)
  const result = approveApplication({
    application,
    relationship,
    collaborations: [...collaborations, ...persistedCollaborations],
  })

  if (result.kind === 'conflict') {
    throw new Error(result.reason)
  }

  writeReceipt({ applicationId, collaboration: result.collaboration })
  return result
}
