import type {
  AudienceSlice,
  ContentFormatInsight,
  InsightMetric,
  InsightObservation,
  RankedInsight,
} from '../../hotel/insights/insights.types'

export const insightMetrics: ReadonlyArray<InsightMetric> = [
  { label: 'Creator audience', value: '2.41M', delta: '+8.4%', positive: true },
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

export const audienceByCreator: ReadonlyArray<RankedInsight> = [
  { label: 'Sofie Larsen', meta: '124K followers · Denmark 41% · 25–34 strongest', value: '4.6% ER' },
  { label: 'Ida Møller', meta: '98K followers · Denmark 36% · 25–34 strongest', value: '5.1% ER' },
  { label: 'Clara Moreau', meta: '86K followers · Germany 31% · 25–34 strongest', value: '4.3% ER' },
  { label: 'James Holloway', meta: '72K followers · United Kingdom 44% · 25–34 strongest', value: '3.9% ER' },
]

export const audienceObservations: ReadonlyArray<InsightObservation> = [
  {
    title: 'Denmark is the largest reachable market',
    detail: 'More than a third of the combined creator audience is in Denmark, followed by Sweden and Germany.',
  },
  {
    title: '25–34 is the clearest age concentration',
    detail: 'This group represents 46% of the observed audience and is consistent across the strongest creator profiles.',
  },
  {
    title: 'The audience remains predominantly female',
    detail: 'Women account for 71% of the observed audience in this period.',
  },
]

export const campaignPerformance: ReadonlyArray<RankedInsight> = [
  { label: 'Coastal Escape', meta: '4 creators · 14 pieces · 1.2M est. reach', value: '32 bookings' },
  { label: 'Heritage & History', meta: '3 creators · 9 pieces · 760K est. reach', value: '28 bookings' },
  { label: 'Summer Wellness', meta: '3 creators · 11 pieces · 940K est. reach', value: '24 bookings' },
  { label: 'Culinary Journey', meta: '3 creators · 8 pieces · 540K est. reach', value: '21 bookings' },
  { label: 'Family Getaway', meta: '2 creators · 7 pieces · 410K est. reach', value: '13 bookings' },
]

export const campaignObservations: ReadonlyArray<InsightObservation> = [
  {
    title: 'Coastal Escape is leading both attention and bookings',
    detail: 'Its creator mix is producing the broadest reach and the highest booking contribution in the current mock period.',
  },
  {
    title: 'Heritage & History converts above its reach position',
    detail: 'It reaches fewer people than Summer Wellness but contributes more bookings, which makes it worth a closer look.',
  },
  {
    title: 'Smaller campaigns still contribute meaningful demand',
    detail: 'Culinary Journey and Family Getaway together account for 34 bookings in the current prototype view.',
  },
]

export const topContent: ReadonlyArray<RankedInsight> = [
  { label: 'Sunrise swim at Marienlyst', meta: 'Sofie Larsen · Reel · Coastal Escape', value: '214K reach' },
  { label: '48 hours of slow wellness', meta: 'Ida Møller · Reel · Summer Wellness', value: '186K reach' },
  { label: 'A room with a story', meta: 'Clara Moreau · Post · Heritage & History', value: '128K reach' },
  { label: 'Dinner by the water', meta: 'Sofie Larsen · Stories · Coastal Escape', value: '94K reach' },
  { label: 'Weekend reset', meta: 'Ida Møller · Stories · Summer Wellness', value: '82K reach' },
]

export const contentObservations: ReadonlyArray<InsightObservation> = [
  {
    title: 'Reels are the strongest discovery format',
    detail: 'They contribute the largest share of reach and contain both of the two highest-reaching pieces in this prototype period.',
  },
  {
    title: 'Posts are smaller but still interaction-rich',
    detail: 'Their reach is lower than Reels, while engagement remains comparatively strong.',
  },
  {
    title: 'Coastal Escape appears repeatedly among the strongest pieces',
    detail: 'That pattern helps explain why the campaign also leads the campaign-level overview.',
  },
]

export const bookingMetrics: ReadonlyArray<InsightMetric> = [
  { label: 'Bookings generated', value: '128', delta: '+19', positive: true },
  { label: 'Attributed revenue', value: '€89,760', delta: '+12.4%', positive: true },
  { label: 'Avg. booking value', value: '€701', delta: '+2.1%', positive: true },
]

export const bookingCampaigns: ReadonlyArray<RankedInsight> = [
  { label: 'Coastal Escape', meta: '32 bookings · 25% of attributed bookings', value: '€22.4K' },
  { label: 'Heritage & History', meta: '28 bookings · 22% of attributed bookings', value: '€19.6K' },
  { label: 'Summer Wellness', meta: '24 bookings · 19% of attributed bookings', value: '€16.8K' },
  { label: 'Culinary Journey', meta: '21 bookings · 16% of attributed bookings', value: '€14.7K' },
  { label: 'Family Getaway', meta: '13 bookings · 10% of attributed bookings', value: '€9.1K' },
]

export const bookingObservations: ReadonlyArray<InsightObservation> = [
  {
    title: 'Coastal Escape contributes the most attributed bookings',
    detail: 'It accounts for one quarter of the prototype attributed bookings in this period.',
  },
  {
    title: 'Heritage & History is efficient relative to its reach',
    detail: 'Its booking contribution is stronger than its position on estimated reach alone would suggest.',
  },
  {
    title: 'The remaining bookings are spread across smaller campaigns',
    detail: 'Ten attributed bookings sit outside the five campaigns shown here in the prototype dataset.',
  },
]
