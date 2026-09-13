import { campaignInvitations } from '../../data/mock/campaign-invitations'
import { cancelCampaignInvitation } from '../../entities/campaign-invitation/campaign-invitation'
import type { HotelCampaignInvitation } from '../../entities/campaign-invitation/campaign-invitation.types'
import { getMockCampaignInvitations, saveMockCampaignInvitation } from './campaign-invitation-storage'

export type CampaignInvitationCancelResult =
  | Readonly<{
      kind: 'cancelled'
      invitation: HotelCampaignInvitation
    }>
  | Readonly<{
      kind: 'already-cancelled'
      invitation: HotelCampaignInvitation
    }>
  | Readonly<{
      kind: 'conflict'
      reason: 'campaign-invitation-not-pending'
      invitation: HotelCampaignInvitation
    }>

export function cancelMockCampaignInvitation(
  invitationId: string,
  cancelledAt = new Date().toISOString(),
): CampaignInvitationCancelResult {
  const invitation = getMockCampaignInvitations(campaignInvitations).find(
    (candidate) => candidate.id === invitationId,
  )

  if (!invitation) throw new Error('campaign_invitation_not_found')

  if (invitation.status === 'CANCELLED') {
    return { kind: 'already-cancelled', invitation }
  }

  if (invitation.status !== 'PENDING') {
    return {
      kind: 'conflict',
      reason: 'campaign-invitation-not-pending',
      invitation,
    }
  }

  const cancelledInvitation = cancelCampaignInvitation(invitation, cancelledAt)
  if (!saveMockCampaignInvitation(cancelledInvitation)) {
    throw new Error('campaign_invitation_persist_failed')
  }

  return { kind: 'cancelled', invitation: cancelledInvitation }
}
