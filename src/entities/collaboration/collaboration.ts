import type { HotelCollaboration } from './collaboration.types'

export function collaborationFromAcceptedApplication({
  applicationId,
  creatorId,
  campaignId,
  relationshipId,
}: Readonly<{
  applicationId: string
  creatorId: string
  campaignId: string
  relationshipId: string
}>): HotelCollaboration {
  return {
    id: `collaboration-${applicationId}`,
    creatorId,
    relationshipId,
    campaignId,
    sourceApplicationId: applicationId,
  }
}
