export type CampaignStatus = 'Active' | 'Ending soon' | 'Upcoming' | 'Draft'

export type DeliverableCounts = Readonly<{
  reels: number
  stories: number
  posts: number
}>

export type CampaignTalent = Readonly<{
  name: string
  initials: string
}>

export type HotelCampaign = Readonly<{
  id: string
  name: string
  subtitle: string
  dates: string
  status: CampaignStatus
  deliverables: DeliverableCounts
  talent: ReadonlyArray<CampaignTalent>
  estimatedReach: string
  estimatedEmv: string
  bookings: string
  progress: number
}>

export type CampaignTab = Readonly<{
  label: string
  count: number
  active?: boolean
}>
