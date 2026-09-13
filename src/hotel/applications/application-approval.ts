import { collaborationFromAcceptedApplication } from '../../entities/collaboration/collaboration'
import type { HotelCollaboration } from '../../entities/collaboration/collaboration.types'
import type { HotelRelationship } from '../../entities/relationship/relationship.types'
import type { HotelApplication } from './applications.types'

export type ApplicationApprovalResult =
  | Readonly<{
      kind: 'approved'
      collaboration: HotelCollaboration
    }>
  | Readonly<{
      kind: 'already-approved'
      collaboration: HotelCollaboration
    }>
  | Readonly<{
      kind: 'conflict'
      reason: 'existing-collaboration-without-application-provenance'
      collaboration: HotelCollaboration
    }>

export function approveApplication({
  application,
  relationship,
  collaborations,
}: Readonly<{
  application: HotelApplication
  relationship: HotelRelationship
  collaborations: ReadonlyArray<HotelCollaboration>
}>): ApplicationApprovalResult {
  if (relationship.creatorId !== application.creatorId) {
    throw new Error('application_relationship_creator_mismatch')
  }

  const sourcedCollaboration = collaborations.find(
    (collaboration) => collaboration.sourceApplicationId === application.id,
  )

  if (sourcedCollaboration) {
    if (
      sourcedCollaboration.creatorId !== application.creatorId ||
      sourcedCollaboration.campaignId !== application.campaignId ||
      sourcedCollaboration.relationshipId !== relationship.id
    ) {
      throw new Error('application_collaboration_identity_mismatch')
    }

    return { kind: 'already-approved', collaboration: sourcedCollaboration }
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

  return {
    kind: 'approved',
    collaboration: collaborationFromAcceptedApplication({
      applicationId: application.id,
      creatorId: application.creatorId,
      campaignId: application.campaignId,
      relationshipId: relationship.id,
    }),
  }
}
