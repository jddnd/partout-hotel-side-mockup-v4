import { describe, expect, it } from 'vitest'
import { applications } from '../../data/mock/applications'
import { campaignDetails } from '../../data/mock/campaign-details'
import { campaigns } from '../../data/mock/campaigns'
import { creators } from '../../data/mock/creators'
import { conversations } from '../../data/mock/messages'
import { creatorProfileReviews } from '../../data/mock/profile-review'
import { stays } from '../../data/mock/stays'

describe('creator domain', () => {
  const creatorIds = new Set(creators.map((creator) => creator.id))

  it('has one stable identity for every creator', () => {
    expect(creatorIds.size).toBe(creators.length)
    expect(creatorIds.has('maya-holm')).toBe(true)
    expect(creatorIds.has('maya-patel')).toBe(true)
    expect('maya-holm').not.toBe('maya-patel')
  })

  it('keeps applications separate from creator identity', () => {
    for (const application of applications) {
      expect(creatorIds.has(application.creatorId)).toBe(true)
      expect(application.id).not.toBe(application.creatorId)
    }
  })

  it('links stays and creator profiles to canonical creators', () => {
    for (const stay of stays) expect(creatorIds.has(stay.creatorId)).toBe(true)
    for (const profile of creatorProfileReviews) expect(creatorIds.has(profile.creatorId)).toBe(true)
  })

  it('links every campaign creator reference to the creator collection', () => {
    for (const campaign of campaigns) {
      for (const talent of campaign.talent) expect(creatorIds.has(talent.creatorId)).toBe(true)
    }

    for (const detail of Object.values(campaignDetails)) {
      for (const request of detail.pendingCreators) expect(creatorIds.has(request.creatorId)).toBe(true)
      for (const creator of detail.confirmedCreators) expect(creatorIds.has(creator.creatorId)).toBe(true)
    }
  })

  it('only links creators to conversations that exist', () => {
    const conversationIds = new Set(conversations.map((conversation) => conversation.id))
    for (const creator of creators) {
      if (creator.conversationId) expect(conversationIds.has(creator.conversationId)).toBe(true)
    }
  })
})
