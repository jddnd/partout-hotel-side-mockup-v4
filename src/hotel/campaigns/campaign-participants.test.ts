import { describe, expect, it } from 'vitest'
import { campaigns } from '../../data/mock/campaigns'
import { getCampaignParticipants } from './campaign-participants'

describe('getCampaignParticipants', () => {
  it('preserves campaign talent and appends missing collaboration participants', () => {
    const campaign = campaigns.find((candidate) => candidate.id === 'heritage-history')
    expect(campaign).toBeDefined()
    if (!campaign) return

    const participants = getCampaignParticipants(campaign)

    expect(participants.map((participant) => participant.creatorId)).toEqual([
      'clara-moreau',
      'anna-berg',
      'maya-holm',
      'daniel-kahn',
      'ida-moller',
    ])
    expect(participants.find((participant) => participant.creatorId === 'clara-moreau')?.roleLabel).toBe('Campaign talent')
    expect(participants.find((participant) => participant.creatorId === 'daniel-kahn')?.roleLabel).toBe('Collaboration')
    expect(participants.find((participant) => participant.creatorId === 'ida-moller')?.roleLabel).toBe('Collaboration')
  })

  it('does not duplicate a creator already listed as campaign talent', () => {
    const campaign = campaigns.find((candidate) => candidate.id === 'coastal-escape')
    expect(campaign).toBeDefined()
    if (!campaign) return

    const participants = getCampaignParticipants(campaign)
    const sofie = participants.filter((participant) => participant.creatorId === 'sofie-larsen')

    expect(sofie).toHaveLength(1)
    expect(sofie[0]?.roleLabel).toBe('Campaign talent')
  })

  it('leaves a campaign with no additional collaborations unchanged', () => {
    const campaign = campaigns.find((candidate) => candidate.id === 'family-getaway')
    expect(campaign).toBeDefined()
    if (!campaign) return

    expect(getCampaignParticipants(campaign).map((participant) => participant.creatorId)).toEqual(
      campaign.talent.map((creator) => creator.creatorId),
    )
  })
})
