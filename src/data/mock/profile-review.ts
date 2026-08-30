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
      { month: 'May 2025', title: 'Coastal Escape' },
      { month: 'Nov 2024', title: 'Wellness Retreat' },
    ],
  },
]
