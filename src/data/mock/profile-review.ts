import type { CreatorProfileReview } from '../../hotel/profile-review/profile-review.types'

export const creatorProfileReviews: ReadonlyArray<CreatorProfileReview> = [
  {
    creatorId: 'sofie-larsen',
    bio: 'Travel creator sharing refined escapes, timeless design and culinary adventures.',
    countries: [
      { label: 'Denmark', share: 34 },
      { label: 'Sweden', share: 19 },
      { label: 'Germany', share: 14 },
      { label: 'Norway', share: 12 },
      { label: 'UK', share: 9 },
      { label: 'Other', share: 12 },
    ],
    ages: [
      { label: '18–24', share: 14 },
      { label: '25–34', share: 48 },
      { label: '35–44', share: 25 },
      { label: '45+', share: 13 },
    ],
    genders: [
      { label: 'Female', share: 72 },
      { label: 'Male', share: 27 },
      { label: 'Other', share: 1 },
    ],
    socialConnections: [
      { platform: 'Instagram', handle: '@sofielarsen_', audience: '124K followers' },
      { platform: 'TikTok', handle: '@sofielarsen', audience: '86K followers' },
      { platform: 'YouTube', handle: 'Sofie Larsen', audience: '20K subscribers' },
    ],
    recentCollaborations: [
      { name: "Hotel d'Angleterre, CPH", date: 'Apr 2025' },
      { name: 'Nobis Hotel, Stockholm', date: 'Mar 2025' },
      { name: 'Six Senses, CPH', date: 'Feb 2025' },
    ],
    previousStays: [
      { month: 'Nov 2024', title: 'Wellness Retreat' },
      { month: 'Jun 2024', title: 'Summer by the Sound' },
    ],
  },
  {
    creatorId: 'james-holloway',
    bio: 'Outdoor and travel filmmaker focused on places that reward curiosity, movement and a strong sense of landscape.',
    countries: [
      { label: 'Australia', share: 31 },
      { label: 'UK', share: 20 },
      { label: 'US', share: 17 },
      { label: 'Germany', share: 10 },
      { label: 'Denmark', share: 8 },
      { label: 'Other', share: 14 },
    ],
    ages: [
      { label: '18–24', share: 18 },
      { label: '25–34', share: 51 },
      { label: '35–44', share: 22 },
      { label: '45+', share: 9 },
    ],
    genders: [
      { label: 'Female', share: 44 },
      { label: 'Male', share: 55 },
      { label: 'Other', share: 1 },
    ],
    socialConnections: [
      { platform: 'Instagram', handle: '@jamesholloway', audience: '256K followers' },
      { platform: 'YouTube', handle: 'James Holloway', audience: '91K subscribers' },
    ],
    recentCollaborations: [
      { name: 'Fogo Island Inn', date: 'Apr 2025' },
      { name: 'The Torridon, Scotland', date: 'Feb 2025' },
      { name: 'Arctic Bath, Sweden', date: 'Jan 2025' },
    ],
    previousStays: [
      { month: 'Sep 2024', title: 'Nordic Autumn' },
    ],
  },
  {
    creatorId: 'clara-moreau',
    bio: 'Paris-based fashion and travel creator pairing strong visual storytelling with boutique hotels, food and city culture.',
    countries: [
      { label: 'France', share: 36 },
      { label: 'Belgium', share: 16 },
      { label: 'Switzerland', share: 14 },
      { label: 'UK', share: 11 },
      { label: 'Denmark', share: 8 },
      { label: 'Other', share: 15 },
    ],
    ages: [
      { label: '18–24', share: 21 },
      { label: '25–34', share: 54 },
      { label: '35–44', share: 18 },
      { label: '45+', share: 7 },
    ],
    genders: [
      { label: 'Female', share: 81 },
      { label: 'Male', share: 18 },
      { label: 'Other', share: 1 },
    ],
    socialConnections: [
      { platform: 'Instagram', handle: '@claramoreau', audience: '199K followers' },
      { platform: 'TikTok', handle: '@claramoreau', audience: '112K followers' },
    ],
    recentCollaborations: [
      { name: 'Hôtel Costes, Paris', date: 'May 2025' },
      { name: 'Ett Hem, Stockholm', date: 'Mar 2025' },
      { name: 'Soho House Copenhagen', date: 'Feb 2025' },
    ],
    previousStays: [
      { month: 'Aug 2024', title: 'Late Summer Escape' },
    ],
  },
]
