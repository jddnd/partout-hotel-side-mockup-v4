import type { HotelCollaboration } from '../../entities/collaboration/collaboration.types'

const APPROVAL_STORAGE_KEY = 'partout.hotel.application-approvals.v1'
const DECLINE_STORAGE_KEY = 'partout.hotel.application-declines.v1'

export type ApplicationApprovalReceipt = Readonly<{
  applicationId: string
  collaboration: HotelCollaboration
}>

export type ApplicationDeclineReceipt = Readonly<{
  applicationId: string
}>

function readReceipts<T>(key: string): ReadonlyArray<T> {
  if (typeof window === 'undefined') return []

  try {
    const parsed = JSON.parse(window.localStorage.getItem(key) ?? '[]')
    return Array.isArray(parsed) ? (parsed as ReadonlyArray<T>) : []
  } catch {
    return []
  }
}

export function readApplicationApprovalReceipts() {
  return readReceipts<ApplicationApprovalReceipt>(APPROVAL_STORAGE_KEY)
}

export function getApplicationApprovalReceipt(applicationId: string) {
  return readApplicationApprovalReceipts().find((receipt) => receipt.applicationId === applicationId)
}

export function writeApplicationApprovalReceipt(receipt: ApplicationApprovalReceipt) {
  if (typeof window === 'undefined') return

  const remaining = readApplicationApprovalReceipts().filter(
    (candidate) => candidate.applicationId !== receipt.applicationId,
  )
  window.localStorage.setItem(APPROVAL_STORAGE_KEY, JSON.stringify([...remaining, receipt]))
}

export function readApplicationDeclineReceipts() {
  return readReceipts<ApplicationDeclineReceipt>(DECLINE_STORAGE_KEY)
}

export function getApplicationDeclineReceipt(applicationId: string) {
  return readApplicationDeclineReceipts().find((receipt) => receipt.applicationId === applicationId)
}

export function writeApplicationDeclineReceipt(receipt: ApplicationDeclineReceipt) {
  if (typeof window === 'undefined') return

  const remaining = readApplicationDeclineReceipts().filter(
    (candidate) => candidate.applicationId !== receipt.applicationId,
  )
  window.localStorage.setItem(DECLINE_STORAGE_KEY, JSON.stringify([...remaining, receipt]))
}
