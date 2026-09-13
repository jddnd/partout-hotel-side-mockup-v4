import { collaborationFromAcceptedInvitation } from '../collaboration/collaboration'
import type { HotelCampaignInvitation } from './campaign-invitation.types'

function requirePending(invitation: HotelCampaignInvitation) {
  if (invitation.status !== 'PENDING') throw new Error('campaign_invitation_not_pending')
}

export function acceptCampaignInvitation({
  invitation,
  relationshipId,
  respondedAt,
}: Readonly<{
  invitation: HotelCampaignInvitation
  relationshipId: string
  respondedAt: string
}>) {
  requirePending(invitation)

  return {
    invitation: {
      ...invitation,
      status: 'ACCEPTED' as const,
      respondedAt,
    },
    collaboration: collaborationFromAcceptedInvitation({
      invitationId: invitation.id,
      creatorId: invitation.creatorId,
      campaignId: invitation.campaignId,
      relationshipId,
    }),
  }
}

export function declineCampaignInvitation(invitation: HotelCampaignInvitation, respondedAt: string): HotelCampaignInvitation {
  requirePending(invitation)
  return { ...invitation, status: 'DECLINED', respondedAt }
}

export function cancelCampaignInvitation(invitation: HotelCampaignInvitation, cancelledAt: string): HotelCampaignInvitation {
  requirePending(invitation)
  return { ...invitation, status: 'CANCELLED', cancelledAt }
}

export function expireCampaignInvitation(invitation: HotelCampaignInvitation): HotelCampaignInvitation {
  requirePending(invitation)
  return { ...invitation, status: 'EXPIRED' }
}
