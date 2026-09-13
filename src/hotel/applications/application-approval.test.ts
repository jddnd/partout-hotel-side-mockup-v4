import { describe, expect, it } from 'vitest'
import { applications } from '../../data/mock/applications'
import { collaborations } from '../../data/mock/collaborations'
import { relationships } from '../../data/mock/relationships'
import type { HotelCollaboration } from '../../entities/collaboration/collaboration.types'
import { approveApplication } from './application-approval'

describe('application approval workflow', () => {
  it('creates a collaboration for a clean application without creating a stay', () => {
    const application = applications[0]
    const relationship = relationships.find((candidate) => candidate.creatorId === application.creatorId)
    expect(relationship).toBeDefined()

    const result = approveApplication({
      application,
      relationship: relationship!,
      collaborations: [],
    })

    expect(result.kind).toBe('approved')
    expect(result.collaboration.sourceApplicationId).toBe(application.id)
    expect(result.collaboration.creatorId).toBe(application.creatorId)
    expect(result.collaboration.campaignId).toBe(application.campaignId)
    expect(result.collaboration.relationshipId).toBe(relationship!.id)
    expect(result.collaboration.stayId).toBeUndefined()
  })

  it('is idempotent when the application already owns the collaboration', () => {
    const application = applications[0]
    const relationship = relationships.find((candidate) => candidate.creatorId === application.creatorId)
    expect(relationship).toBeDefined()

    const existing = collaborations.find((candidate) => candidate.sourceApplicationId === application.id)
    expect(existing).toBeDefined()

    const result = approveApplication({ application, relationship: relationship!, collaborations })

    expect(result.kind).toBe('already-approved')
    expect(result.collaboration).toBe(existing)
  })

  it('does not silently attach an application to an existing collaboration with unknown provenance', () => {
    const application = applications[0]
    const relationship = relationships.find((candidate) => candidate.creatorId === application.creatorId)
    expect(relationship).toBeDefined()

    const existing: HotelCollaboration = {
      id: 'collaboration-with-unknown-provenance',
      creatorId: application.creatorId,
      relationshipId: relationship!.id,
      campaignId: application.campaignId,
    }

    const result = approveApplication({
      application,
      relationship: relationship!,
      collaborations: [existing],
    })

    expect(result.kind).toBe('conflict')
    if (result.kind === 'conflict') {
      expect(result.reason).toBe('existing-collaboration-without-application-provenance')
      expect(result.collaboration).toBe(existing)
    }
  })

  it('resolves every visible application to its already-modeled collaboration', () => {
    for (const application of applications) {
      const relationship = relationships.find((candidate) => candidate.creatorId === application.creatorId)
      expect(relationship).toBeDefined()

      const result = approveApplication({
        application,
        relationship: relationship!,
        collaborations,
      })

      expect(result.kind).toBe('already-approved')
      expect(result.collaboration.sourceApplicationId).toBe(application.id)
      expect(result.collaboration.creatorId).toBe(application.creatorId)
      expect(result.collaboration.campaignId).toBe(application.campaignId)
    }
  })

  it('rejects a relationship belonging to another creator', () => {
    const application = applications[0]
    const wrongRelationship = relationships.find((candidate) => candidate.creatorId !== application.creatorId)
    expect(wrongRelationship).toBeDefined()

    expect(() =>
      approveApplication({
        application,
        relationship: wrongRelationship!,
        collaborations: [],
      }),
    ).toThrow('application_relationship_creator_mismatch')
  })
})
