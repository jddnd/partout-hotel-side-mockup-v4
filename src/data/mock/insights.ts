import type {
  AudienceSlice,
  ContentFormatInsight,
  InsightMetric,
  InsightObservation,
  RankedInsight,
} from '../../hotel/insights/insights.types'

export const insightMetrics: ReadonlyArray<InsightMetric> = [
  { label: 'Total platform audience', value: '2.41M', delta: '+8.4%', positive: true },
  { label: 'Reach', value: '1.12M', delta: '+12.1%', positive: true },
  { label: 'Engagement', value: '4.28%', delta: '+0.6 pt', positive: true },
  { label: 'Avg. audience quality', value: '81 / 100', delta: '+3 pts', positive: true },
  { label: 'EMV', value: '€612,480', delta: '+14.8%', positive: true },
  { label: 'Bookings generated', value: '128', delta: '+19', positive: true },
]

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

export const topCampaigns: ReadonlyArray<RankedInsight> = [
  { label: 'Coastal Escape', meta: '1.2M est. reach', value: '32 bookings' },
  { label: 'Summer Wellness', meta: '940K est. reach', value: '24 bookings' },
  { label: 'Heritage & History', meta: '760K est. reach', value: '28 bookings' },
]

export const topTalent: ReadonlyArray<RankedInsight> = [
  { label: 'Sofie Larsen', meta: '124K followers · 4.6% ER', value: '€86.4K EMV' },
  { label: 'Ida Møller', meta: '98K followers · 5.1% ER', value: '€72.8K EMV' },
  { label: 'Clara Moreau', meta: '86K followers · 4.3% ER', value: '€61.2K EMV' },
]

export const contentFormats: ReadonlyArray<ContentFormatInsight> = [
  { format: 'Reels', reach: '612K', engagement: '5.4%', share: 100 },
  { format: 'Stories', reach: '318K', engagement: '3.2%', share: 52 },
  { format: 'Posts', reach: '190K', engagement: '4.1%', share: 31 },
]

export const insightObservations: ReadonlyArray<InsightObservation> = [
  {
    title: 'Reels are carrying discovery',
    detail: 'They account for the largest share of reach and the strongest engagement this period.',
  },
  {
    title: '25–34 remains the strongest audience',
    detail: 'Nearly half of the reachable audience sits in the hotel’s core city-break demographic.',
  },
  {
    title: 'Coastal Escape converts best',
    detail: 'It combines the largest reach with the highest booking contribution among active campaigns.',
  },
]
