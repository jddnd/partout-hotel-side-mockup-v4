type CollaborationParticipationSource =
  | Readonly<{ sourceApplicationId: string; sourceCampaignInvitationId?: never }>
  | Readonly<{ sourceApplicationId?: never; sourceCampaignInvitationId: string }>
  | Readonly<{ sourceApplicationId?: never; sourceCampaignInvitationId?: never }>

export type HotelCollaboration = Readonly<{
  id: string
  creatorId: string
  relationshipId: string
  campaignId: string
  stayId?: string
  agreedContentCompleted?: number
  agreedContentTotal?: number
}> & CollaborationParticipationSource
