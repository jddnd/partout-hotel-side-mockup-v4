import type { HotelCollaboration } from '../../entities/collaboration/collaboration.types'

export const collaborations: ReadonlyArray<HotelCollaboration> = [
  {
    id: 'collaboration-coastal-escape-sofie-larsen',
    creatorId: 'sofie-larsen',
    relationshipId: 'relationship-sofie-larsen',
    campaignId: 'coastal-escape',
    stayId: 'sofie-larsen',
    agreedContentCompleted: 3,
    agreedContentTotal: 4,
  },
  {
    id: 'collaboration-coastal-escape-james-holloway',
    creatorId: 'james-holloway',
    relationshipId: 'relationship-james-holloway',
    campaignId: 'coastal-escape',
    stayId: 'james-holloway',
    agreedContentCompleted: 0,
    agreedContentTotal: 3,
  },
  {
    id: 'collaboration-summer-wellness-clara-moreau',
    creatorId: 'clara-moreau',
    relationshipId: 'relationship-clara-moreau',
    campaignId: 'summer-wellness',
    stayId: 'clara-moreau',
    agreedContentCompleted: 0,
    agreedContentTotal: 4,
  },
  {
    id: 'collaboration-heritage-history-daniel-kahn',
    creatorId: 'daniel-kahn',
    relationshipId: 'relationship-daniel-kahn',
    campaignId: 'heritage-history',
    stayId: 'daniel-kahn',
    agreedContentCompleted: 0,
    agreedContentTotal: 3,
  },
  {
    id: 'collaboration-culinary-journey-maya-patel',
    creatorId: 'maya-patel',
    relationshipId: 'relationship-maya-patel',
    campaignId: 'culinary-journey',
    stayId: 'maya-patel',
    agreedContentCompleted: 0,
    agreedContentTotal: 2,
  },
  {
    id: 'collaboration-heritage-history-ida-moller',
    creatorId: 'ida-moller',
    relationshipId: 'relationship-ida-moller',
    campaignId: 'heritage-history',
    agreedContentCompleted: 4,
    agreedContentTotal: 5,
  },
]

export function getCollaboration(collaborationId: string) {
  return collaborations.find((collaboration) => collaboration.id === collaborationId)
}

export function getStayCollaboration(stayId: string) {
  return collaborations.find((collaboration) => collaboration.stayId === stayId)
}
