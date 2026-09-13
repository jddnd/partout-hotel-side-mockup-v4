import { describe, expect, it } from 'vitest'
import { applications } from '../../data/mock/applications'
import { campaignInvitations } from '../../data/mock/campaign-invitations'
import { campaigns } from '../../data/mock/campaigns'
import { collaborations } from '../../data/mock/collaborations'
import { creators } from '../../data/mock/creators'
import { relationshipContexts, relationships } from '../../data/mock/relationships'
import { stays } from '../../data/mock/stays'
import { collaborationFromAcceptedApplication } from './collaboration'

describe('collaboration domain', () => {
  const creatorIds = new Set(creators.map((creator) => creator.id))
  const campaignIds = new Set(campaigns.map((campaign) => campaign.id))
  const relationshipIds = new Set(relationships.map((relationship) => relationship.id))
  const collaborationIds = new Set(collaborations.map((collaboration) => collaboration.id))
  const applicationIds = new Set(applications.map((application) => application.id))
  const campaignInvitationIds = new Set(campaignInvitations.map((invitation) => invitation.id))

  it('has stable collaboration identities with valid core references', () => {
    expect(collaborationIds.size).toBe(collaborations.length)

    for (const collaboration of collaborations) {
      expect(creatorIds.has(collaboration.creatorId)).toBe(true)
      expect(campaignIds.has(collaboration.campaignId)).toBe(true)
      expect(relationshipIds.has(collaboration.relationshipId)).toBe(true)

      const relationship = relationships.find((candidate) => candidate.id === collaboration.relationshipId)
      expect(relationship?.creatorId).toBe(collaboration.creatorId)
    }
  })

  it('keeps application and invitation as mutually exclusive collaboration sources', () => {
    for (const collaboration of collaborations) {
      const sourceCount = Number(Boolean(collaboration.sourceApplicationId)) + Number(Boolean(collaboration.sourceCampaignInvitationId))
      expect(sourceCount).toBeLessThanOrEqual(1)

      if (collaboration.sourceApplicationId) expect(applicationIds.has(collaboration.sourceApplicationId)).toBe(true)
      if (collaboration.sourceCampaignInvitationId) expect(campaignInvitationIds.has(collaboration.sourceCampaignInvitationId)).toBe(true)
    }
  })

  it('makes stays operational occurrences inside collaborations', () => {
    for (const stay of stays) {
      const collaboration = collaborations.find((candidate) => candidate.id === stay.collaborationId)
      expect(collaboration).toBeDefined()
      expect(collaboration?.stayId).toBe(stay.id)
      expect(collaboration?.creatorId).toBe(stay.creatorId)
      expect(collaboration?.relationshipId).toBe(stay.relationshipId)
      expect(collaboration?.campaignId).toBe(stay.campaignId)
    }
  })

  it('keeps publishing progress on collaboration rather than stay', () => {
    for (const collaboration of collaborations) {
      if (collaboration.agreedContentTotal === undefined) continue
      expect(collaboration.agreedContentTotal).toBeGreaterThan(0)
      expect(collaboration.agreedContentCompleted ?? 0).toBeGreaterThanOrEqual(0)
      expect(collaboration.agreedContentCompleted ?? 0).toBeLessThanOrEqual(collaboration.agreedContentTotal)
    }

    for (const stay of stays) {
      expect('agreedContentTotal' in stay).toBe(false)
      expect('agreedContentCompleted' in stay).toBe(false)
    }
  })

  it('lets relationship context point to a collaboration without making it conversation data', () => {
    for (const context of Object.values(relationshipContexts)) {
      if (!context.collaborationId) continue
      const collaboration = collaborations.find((candidate) => candidate.id === context.collaborationId)
      expect(collaboration).toBeDefined()
      expect(collaboration?.relationshipId).toBe(context.relationshipId)
      expect(collaboration?.campaignId).toBe(context.campaignId)
      if (context.stayId) expect(collaboration?.stayId).toBe(context.stayId)
    }
  })

  it('can create a collaboration from an accepted application before a stay exists', () => {
    const application = applications[0]
    const relationship = relationships.find((candidate) => candidate.creatorId === application.creatorId)
    expect(relationship).toBeDefined()

    const collaboration = collaborationFromAcceptedApplication({
      applicationId: application.id,
      creatorId: application.creatorId,
      campaignId: application.campaignId,
      relationshipId: relationship!.id,
    })

    expect(collaboration.sourceApplicationId).toBe(application.id)
    expect(collaboration.sourceCampaignInvitationId).toBeUndefined()
    expect(collaboration.creatorId).toBe(application.creatorId)
    expect(collaboration.campaignId).toBe(application.campaignId)
    expect(collaboration.relationshipId).toBe(relationship!.id)
    expect(collaboration.stayId).toBeUndefined()
  })
})
