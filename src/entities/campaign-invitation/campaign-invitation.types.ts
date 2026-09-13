export type CampaignInvitationStatus = 'PENDING' | 'ACCEPTED' | 'DECLINED' | 'CANCELLED' | 'EXPIRED'

export type HotelCampaignInvitation = Readonly<{
  id: string
  creatorId: string
  campaignId: string
  campaignWindowId?: string
  status: CampaignInvitationStatus
  createdAt: string
  respondBy: string | null
  respondedAt?: string
  cancelledAt?: string
}>
