export type InsightMetric = Readonly<{
  label: string
  value: string
  delta: string
  positive?: boolean
}>

export type AudienceSlice = Readonly<{
  label: string
  share: number
}>

export type RankedInsight = Readonly<{
  label: string
  meta: string
  value: string
}>

export type ContentFormatInsight = Readonly<{
  format: 'Reels' | 'Stories' | 'Posts'
  reach: string
  engagement: string
  share: number
}>

export type InsightObservation = Readonly<{
  title: string
  detail: string
}>
