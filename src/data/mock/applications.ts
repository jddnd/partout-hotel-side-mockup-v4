import type { HotelApplication, ShortlistCreator } from '../../hotel/applications/applications.types'

export const applications: HotelApplication[] = [
  {
    id: 'sofie-larsen',
    name: 'Sofie Larsen',
    location: 'Copenhagen, Denmark',
    followers: '124K',
    engagementRate: '4.6%',
    audienceQuality: '82/100',
    fitScore: '92%',
    topAudience: 'Denmark, Sweden, Norway',
    audienceShare: '72%',
    contentFocus: 'Luxury travel, Lifestyle',
    previousStays: '2 with us',
  },
  {
    id: 'james-holloway',
    name: 'James Holloway',
    location: 'Sydney, Australia',
    followers: '256K',
    engagementRate: '3.1%',
    audienceQuality: '87/100',
    fitScore: '88%',
    topAudience: 'Australia, UK, US',
    audienceShare: '68%',
    contentFocus: 'Adventure, Outdoor',
    previousStays: '1 with us',
  },
  {
    id: 'clara-moreau',
    name: 'Clara Moreau',
    location: 'Paris, France',
    followers: '199K',
    engagementRate: '5.1%',
    audienceQuality: '78/100',
    fitScore: '90%',
    topAudience: 'France, Belgium, Switzerland',
    audienceShare: '66%',
    contentFocus: 'Fashion, Luxury, Lifestyle',
    previousStays: '1 with us',
  },
]

export const shortlist: ShortlistCreator[] = applications.map(({ id, name, location, fitScore }) => ({
  id,
  name,
  location,
  fitScore,
}))
