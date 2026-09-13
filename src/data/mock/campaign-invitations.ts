import type { HotelCampaignInvitation } from '../../entities/campaign-invitation/campaign-invitation.types'

// No current Hotel mock record proves that a specific creator entered a campaign by invitation.
// Keep this canonical collection empty until an invitation is explicitly modeled rather than
// guessing from confirmed campaign talent or existing collaborations.
export const campaignInvitations: ReadonlyArray<HotelCampaignInvitation> = []

export function getCampaignInvitation(invitationId: string) {
  return campaignInvitations.find((invitation) => invitation.id === invitationId)
}
