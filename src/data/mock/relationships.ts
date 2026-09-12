import type { HotelRelationship, RelationshipContext } from '../../entities/relationship/relationship.types'

export const relationships: ReadonlyArray<HotelRelationship> = [
  {
    id: 'relationship-sofie-larsen',
    creatorId: 'sofie-larsen',
    label: '3rd stay together',
    detail: 'Two previous stays with Marienlyst',
    knownSince: 'Nov 2024',
    previousStays: ['Wellness Retreat · Nov 2024', 'Winter Reset · Jan 2025'],
  },
  {
    id: 'relationship-clara-moreau',
    creatorId: 'clara-moreau',
    label: '2nd stay together',
    detail: 'One previous stay with Marienlyst',
    knownSince: 'Oct 2024',
    previousStays: ['Autumn Spa · Oct 2024'],
  },
  {
    id: 'relationship-ida-moller',
    creatorId: 'ida-moller',
    label: '4th collaboration',
    detail: 'A returning creator relationship',
    knownSince: 'Jun 2024',
    previousStays: ['Summer House · Jun 2024', 'Autumn Table · Sep 2024', 'Winter Coast · Jan 2025'],
  },
  {
    id: 'relationship-anna-berg',
    creatorId: 'anna-berg',
    label: 'New relationship',
    detail: 'First conversation with Marienlyst',
    knownSince: 'May 2025',
    previousStays: [],
  },
  {
    id: 'relationship-james-holloway',
    creatorId: 'james-holloway',
    label: 'New relationship',
    detail: 'First contact with Marienlyst',
    knownSince: 'May 2025',
    previousStays: [],
  },
  {
    id: 'relationship-maya-patel',
    creatorId: 'maya-patel',
    label: '2nd stay together',
    detail: 'One previous stay with Marienlyst',
    knownSince: 'Aug 2024',
    previousStays: ['Late Summer Table · Aug 2024'],
  },
  {
    id: 'relationship-daniel-kahn',
    creatorId: 'daniel-kahn',
    label: 'First stay together',
    detail: 'This is the beginning of your relationship through Heritage & History.',
    knownSince: 'May 2025',
    previousStays: [],
  },
]

export const relationshipContexts: Readonly<Record<string, RelationshipContext>> = {
  'relationship-sofie-larsen': {
    relationshipId: 'relationship-sofie-larsen',
    campaign: 'Coastal Escape',
    campaignId: 'coastal-escape',
    campaignDates: 'May 1 – May 31, 2025',
    currentContext: 'In house · May 14–16',
    stayId: 'sofie-larsen',
    room: 'Sea View 214',
    checkIn: 'May 14 · 15:00',
    checkOut: 'May 16 · 11:00',
    agreedContentCompleted: 3,
    agreedContentTotal: 4,
  },
  'relationship-clara-moreau': {
    relationshipId: 'relationship-clara-moreau',
    campaign: 'Summer Wellness',
    campaignId: 'summer-wellness',
    campaignDates: 'May 10 – Jun 10, 2025',
    currentContext: 'Arrives tomorrow · May 16–18',
    stayId: 'clara-moreau',
    room: 'Spa Suite 305',
    checkIn: 'May 16 · 15:00',
    checkOut: 'May 18 · 11:00',
    agreedContentCompleted: 0,
    agreedContentTotal: 4,
  },
  'relationship-ida-moller': {
    relationshipId: 'relationship-ida-moller',
    campaign: 'Heritage & History',
    campaignId: 'heritage-history',
    campaignDates: 'Apr 20 – May 20, 2025',
    currentContext: 'Publishing from latest stay',
    agreedContentCompleted: 4,
    agreedContentTotal: 5,
  },
  'relationship-anna-berg': {
    relationshipId: 'relationship-anna-berg',
    campaign: 'Culinary Journey',
    campaignId: 'culinary-journey',
    campaignDates: 'May 15 – Jun 15, 2025',
    currentContext: 'Application awaiting review',
  },
  'relationship-james-holloway': {
    relationshipId: 'relationship-james-holloway',
    campaign: 'Coastal Escape',
    campaignId: 'coastal-escape',
    campaignDates: 'May 1 – May 31, 2025',
    currentContext: 'Application awaiting review',
  },
  'relationship-maya-patel': {
    relationshipId: 'relationship-maya-patel',
    campaign: 'Culinary Journey',
    campaignId: 'culinary-journey',
    campaignDates: 'May 15 – Jun 15, 2025',
    currentContext: 'Upcoming · May 18–20',
    stayId: 'maya-patel',
    room: 'Sea View 208',
    checkIn: 'May 18 · 15:00',
    checkOut: 'May 20 · 11:00',
    agreedContentCompleted: 0,
    agreedContentTotal: 2,
  },
}

export function getRelationship(relationshipId: string) {
  return relationships.find((relationship) => relationship.id === relationshipId)
}

export function getCreatorRelationship(creatorId: string) {
  return relationships.find((relationship) => relationship.creatorId === creatorId)
}
