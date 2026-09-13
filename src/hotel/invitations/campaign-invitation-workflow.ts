import type { HotelCampaignInvitation } from '../../entities/campaign-invitation/campaign-invitation.types'
import type { HotelApplication } from '../applications/applications.types'
import type { HotelCampaign } from '../campaigns/campaigns.types'

export type CampaignInviteResult =
  | Readonly<{ kind: 'created'; invitation: HotelCampaignInvitation }>
  | Readonly<{ kind: 'already-pending'; invitation: HotelCampaignInvitation }>
  | Readonly<{
      kind: 'conflict'
      reason: 'campaign-not-accepting-participation' | 'application-already-exists' | 'campaign-invitation-not-pending'
      invitation?: HotelCampaignInvitation
    }>

export function inviteCreatorToCampaign({
  campaign,
  creatorId,
  applications,
  invitations,
  createdAt,
}: Readonly<{
  campaign: HotelCampaign
  creatorId: string
  applications: ReadonlyArray<HotelApplication>
  invitations: ReadonlyArray<HotelCampaignInvitation>
  createdAt: string
}>): CampaignInviteResult {
  if (campaign.status !== 'Active' && campaign.status !== 'Ending soon') {
    return { kind: 'conflict', reason: 'campaign-not-accepting-participation' }
  }

  if (
    applications.some(
      (application) => application.campaignId === campaign.id && application.creatorId === creatorId,
    )
  ) {
    return { kind: 'conflict', reason: 'application-already-exists' }
  }

  const existingInvitation = invitations.find(
    (invitation) => invitation.campaignId === campaign.id && invitation.creatorId === creatorId,
  )

  if (existingInvitation) {
    if (existingInvitation.status === 'PENDING') {
      return { kind: 'already-pending', invitation: existingInvitation }
    }

    return {
      kind: 'conflict',
      reason: 'campaign-invitation-not-pending',
      invitation: existingInvitation,
    }
  }

  return {
    kind: 'created',
    invitation: {
      id: `campaign-invitation-${campaign.id}-${creatorId}`,
      creatorId,
      campaignId: campaign.id,
      status: 'PENDING',
      createdAt,
      respondBy: null,
    },
  }
}
