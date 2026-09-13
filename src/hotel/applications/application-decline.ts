import type { HotelCollaboration } from '../../entities/collaboration/collaboration.types'
import type { HotelApplication } from './applications.types'

export type ApplicationDeclineResult =
  | Readonly<{
      kind: 'declined'
      applicationId: string
    }>
  | Readonly<{
      kind: 'already-declined'
      applicationId: string
    }>
  | Readonly<{
      kind: 'conflict'
      reason: 'application-already-approved' | 'existing-collaboration-without-application-provenance'
      collaboration: HotelCollaboration
    }>

export function declineApplication({
  application,
  collaborations,
  alreadyDeclined,
}: Readonly<{
  application: HotelApplication
  collaborations: ReadonlyArray<HotelCollaboration>
  alreadyDeclined: boolean
}>): ApplicationDeclineResult {
  if (alreadyDeclined) {
    return { kind: 'already-declined', applicationId: application.id }
  }

  const sourcedCollaboration = collaborations.find(
    (collaboration) => collaboration.sourceApplicationId === application.id,
  )

  if (sourcedCollaboration) {
    return {
      kind: 'conflict',
      reason: 'application-already-approved',
      collaboration: sourcedCollaboration,
    }
  }

  const existingParticipation = collaborations.find(
    (collaboration) =>
      collaboration.creatorId === application.creatorId &&
      collaboration.campaignId === application.campaignId,
  )

  if (existingParticipation) {
    return {
      kind: 'conflict',
      reason: 'existing-collaboration-without-application-provenance',
      collaboration: existingParticipation,
    }
  }

  return { kind: 'declined', applicationId: application.id }
}
