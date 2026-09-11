import type {
  AudienceSlice,
  ContentFormatInsight,
  ContributionInsight,
  InsightMetric,
  InsightObservation,
} from '../../hotel/insights/insights.types'

export const insightMetrics: ReadonlyArray<InsightMetric> = [
  { label: 'People reached', value: '1.12M', note: 'Platform-synced reach' },
  { label: 'Engagement', value: '84K', note: 'Total interactions, not a rate' },
  { label: 'Tracking clicks', value: '3,842', note: 'From collaboration links' },
]

export const insightDelivery = {
  publishedContent: 59,
  stays: 18,
  campaigns: 8,
} as const

export const campaignContributions: ReadonlyArray<ContributionInsight> = [
  {
    id: 'coastal-escape',
    label: 'Coastal Escape',
    meta: '14 published · 4 creators',
    value: '382K reach',
    href: '/hotel/campaigns/coastal-escape',
  },
  {
    id: 'summer-wellness',
    label: 'Summer Wellness',
    meta: '11 published · 3 creators',
    value: '294K reach',
    href: '/hotel/campaigns/summer-wellness',
  },
  {
    id: 'heritage-history',
    label: 'Heritage & History',
    meta: '9 published · 3 creators',
    value: '218K reach',
    href: '/hotel/campaigns/heritage-history',
  },
]

export const creatorContributions: ReadonlyArray<ContributionInsight> = [
  {
    id: 'sofie-larsen',
    label: 'Sofie Larsen',
    meta: '3 campaigns · 12 published',
    value: '248K reach',
    href: '/hotel/messages?creator=sofie-larsen',
  },
  {
    id: 'ida-moller',
    label: 'Ida Møller',
    meta: '2 campaigns · 10 published',
    value: '211K reach',
    href: '/hotel/messages?creator=ida-moller',
  },
  {
    id: 'clara-moreau',
    label: 'Clara Moreau',
    meta: '2 campaigns · 9 published',
    value: '176K reach',
    href: '/hotel/messages?creator=clara-moreau',
  },
]

export const contentFormats: ReadonlyArray<ContentFormatInsight> = [
  { format: 'Reels', reach: '612K', engagement: '46K', published: 22, share: 100 },
  { format: 'Stories', reach: '318K', engagement: '12K', published: 21, share: 52 },
  { format: 'Posts', reach: '190K', engagement: '26K', published: 16, share: 31 },
]

export const insightObservations: ReadonlyArray<InsightObservation> = [
  {
    eyebrow: 'Worth noticing',
    title: 'Coastal Escape is carrying the strongest measured reach.',
    detail: 'Its 14 published pieces account for 382K of the measured reach this period. Use that as a reason to look closer at the people and content behind the campaign — not as a creator ranking.',
    actionLabel: 'Open Coastal Escape',
    href: '/hotel/campaigns/coastal-escape',
  },
]

// Retained for the existing audience workbench components. Audience aggregation is
// not used on the new Insights overview because it is not canonical Hotel Activity truth yet.
export const audienceCountries: ReadonlyArray<AudienceSlice> = [
  { label: 'Denmark', share: 37 },
  { label: 'Sweden', share: 18 },
  { label: 'Germany', share: 15 },
  { label: 'Norway', share: 11 },
  { label: 'United Kingdom', share: 8 },
  { label: 'Other', share: 11 },
]

export const audienceAges: ReadonlyArray<AudienceSlice> = [
  { label: '18–24', share: 15 },
  { label: '25–34', share: 46 },
  { label: '35–44', share: 26 },
  { label: '45+', share: 13 },
]

export const audienceGenders: ReadonlyArray<AudienceSlice> = [
  { label: 'Female', share: 71 },
  { label: 'Male', share: 28 },
  { label: 'Other', share: 1 },
]

export const topCampaigns = campaignContributions
export const topTalent = creatorContributions
