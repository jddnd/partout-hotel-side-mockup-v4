import type { Creator } from '../../entities/creator/creator.types'

export const creators: ReadonlyArray<Creator> = [
  {
    id: 'sofie-larsen',
    name: 'Sofie Larsen',
    initials: 'SL',
    location: 'Copenhagen, Denmark',
    followers: '124K',
    engagementRate: '4.6%',
    audienceQuality: '82/100',
    topAudience: 'Denmark, Sweden, Norway',
    audienceShare: '72%',
    contentFocus: 'Luxury travel, Lifestyle',
    previousStaysLabel: '2 with us',
  },
  {
    id: 'james-holloway',
    name: 'James Holloway',
    initials: 'JH',
    location: 'Sydney, Australia',
    followers: '256K',
    engagementRate: '3.1%',
    audienceQuality: '87/100',
    topAudience: 'Australia, UK, US',
    audienceShare: '68%',
    contentFocus: 'Adventure, Outdoor',
    previousStaysLabel: '1 with us',
  },
  {
    id: 'clara-moreau',
    name: 'Clara Moreau',
    initials: 'CM',
    location: 'Paris, France',
    followers: '199K',
    engagementRate: '5.1%',
    audienceQuality: '78/100',
    topAudience: 'France, Belgium, Switzerland',
    audienceShare: '66%',
    contentFocus: 'Fashion, Luxury, Lifestyle',
    previousStaysLabel: '1 with us',
  },
  { id: 'ida-moller', name: 'Ida Møller', initials: 'IM' },
  { id: 'anna-berg', name: 'Anna Berg', initials: 'AB' },
  { id: 'maya-holm', name: 'Maya Holm', initials: 'MH' },
  { id: 'maya-patel', name: 'Maya Patel', initials: 'MP', location: 'London, UK' },
  { id: 'daniel-kahn', name: 'Daniel Kahn', initials: 'DK', location: 'Berlin, Germany' },
]

export function getCreator(creatorId: string) {
  return creators.find((creator) => creator.id === creatorId)
}
