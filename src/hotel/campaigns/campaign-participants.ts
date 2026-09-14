import { collaborations } from '../../data/mock/collaborations'
import { getCreator } from '../../data/mock/creators'
import type { HotelCampaign } from './campaigns.types'

export type CampaignParticipant = Readonly<{
  creatorId: string
  name: string
  initials: string
  roleLabel: 'Campaign talent' | 'Collaboration'
}>

export function getCampaignParticipants(campaign: HotelCampaign): ReadonlyArray<CampaignParticipant> {
  const campaignTalent = campaign.talent.map((creator) => ({
    creatorId: creator.creatorId,
    name: creator.name,
    initials: creator.initials,
    roleLabel: 'Campaign talent' as const,
  }))
  const seenCreatorIds = new Set(campaignTalent.map((creator) => creator.creatorId))

  const collaborationParticipants = collaborations.flatMap((collaboration) => {
    if (collaboration.campaignId !== campaign.id || seenCreatorIds.has(collaboration.creatorId)) return []

    const creator = getCreator(collaboration.creatorId)
    if (!creator) return []

    seenCreatorIds.add(creator.id)
    return [{
      creatorId: creator.id,
      name: creator.name,
      initials: creator.initials,
      roleLabel: 'Collaboration' as const,
    }]
  })

  return [...campaignTalent, ...collaborationParticipants]
}
