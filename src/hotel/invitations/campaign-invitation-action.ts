import { applications } from '../../data/mock/applications'
import { campaignInvitations } from '../../data/mock/campaign-invitations'
import { campaigns } from '../../data/mock/campaigns'
import { getCreator } from '../../data/mock/creators'
import { getMockCampaigns } from '../campaigns/campaign-mock-storage'
import { inviteCreatorToCampaign } from './campaign-invitation-workflow'
import { getMockCampaignInvitations, saveMockCampaignInvitation } from './campaign-invitation-storage'

export type CampaignInviteActionResult = ReturnType<typeof inviteCreatorToCampaign>

export function inviteTalentToCampaign({
  creatorId,
  campaignId,
  createdAt = new Date().toISOString(),
}: Readonly<{
  creatorId: string
  campaignId: string
  createdAt?: string
}>): CampaignInviteActionResult {
  const creator = getCreator(creatorId)
  if (!creator) throw new Error('creator_not_found')

  const campaign = getMockCampaigns(campaigns).find((candidate) => candidate.id === campaignId)
  if (!campaign) throw new Error('campaign_not_found')

  const result = inviteCreatorToCampaign({
    campaign,
    creatorId: creator.id,
    applications,
    invitations: getMockCampaignInvitations(campaignInvitations),
    createdAt,
  })

  if (result.kind === 'created' && !saveMockCampaignInvitation(result.invitation)) {
    throw new Error('campaign_invitation_persist_failed')
  }

  return result
}
