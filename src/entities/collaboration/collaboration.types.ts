export type HotelCollaboration = Readonly<{
  id: string
  creatorId: string
  relationshipId: string
  campaignId: string
  sourceApplicationId?: string
  sourceCampaignInvitationId?: string
  stayId?: string
  agreedContentCompleted?: number
  agreedContentTotal?: number
}>
