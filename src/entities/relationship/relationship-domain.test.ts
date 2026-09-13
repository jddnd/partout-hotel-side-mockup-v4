import { describe, expect, it } from 'vitest'
import { campaigns } from '../../data/mock/campaigns'
import { conversations, conversationMessages } from '../../data/mock/messages'
import { relationshipContexts, relationships } from '../../data/mock/relationships'
import { stays } from '../../data/mock/stays'

describe('relationship domain', () => {
  const relationshipIds = new Set(relationships.map((relationship) => relationship.id))
  const campaignIds = new Set(campaigns.map((campaign) => campaign.id))
  const stayIds = new Set(stays.map((stay) => stay.id))

  it('has one durable relationship identity per represented creator', () => {
    const creatorIds = relationships.map((relationship) => relationship.creatorId)
    expect(relationshipIds.size).toBe(relationships.length)
    expect(new Set(creatorIds).size).toBe(creatorIds.length)
  })

  it('makes conversations channels that reference relationships', () => {
    for (const conversation of conversations) {
      expect(relationshipIds.has(conversation.relationshipId)).toBe(true)
      const relationship = relationships.find((candidate) => candidate.id === conversation.relationshipId)
      expect(relationship?.creatorId).toBe(conversation.creatorId)
      expect(conversationMessages[conversation.id]).toBeDefined()
    }
  })

  it('links every stay to the matching creator relationship', () => {
    for (const stay of stays) {
      expect(relationshipIds.has(stay.relationshipId)).toBe(true)
      const relationship = relationships.find((candidate) => candidate.id === stay.relationshipId)
      expect(relationship?.creatorId).toBe(stay.creatorId)
    }
  })

  it('keeps current campaign and stay context outside the conversation record', () => {
    for (const [relationshipId, context] of Object.entries(relationshipContexts)) {
      expect(relationshipIds.has(relationshipId)).toBe(true)
      expect(context.relationshipId).toBe(relationshipId)
      expect(campaignIds.has(context.campaignId)).toBe(true)
      if (context.stayId) expect(stayIds.has(context.stayId)).toBe(true)
    }
  })
})
