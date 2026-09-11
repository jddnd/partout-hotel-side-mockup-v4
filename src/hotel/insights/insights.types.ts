export type InsightMetric = Readonly<{
  label: string
  value: string
  note: string
}>

export type AudienceSlice = Readonly<{
  label: string
  share: number
}>

export type ContributionInsight = Readonly<{
  id: string
  label: string
  meta: string
  value: string
  href: string
}>

export type RankedInsight = ContributionInsight

export type ContentFormatInsight = Readonly<{
  format: 'Reels' | 'Stories' | 'Posts'
  reach: string
  engagement: string
  published: number
  share: number
}>

export type InsightObservation = Readonly<{
  eyebrow: string
  title: string
  detail: string
  actionLabel: string
  href: string
}>
