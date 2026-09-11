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

export type CampaignRequest = Readonly<{
  id: string
  name: string
  initials: string
  location: string
  audience: string
  preferredDates: string
}>

export type ConfirmedCampaignCreator = Readonly<{
  name: string
  initials: string
  dates: string
}>

export type CampaignStayWindow = Readonly<{
  label: string
  filled: number
  total: number
  status: 'Open' | 'Full' | 'Closed'
}>

export type CampaignDetail = Readonly<{
  openUntil: string
  selectionLimit: number
  confirmedCount: number
  pendingCreators: ReadonlyArray<CampaignRequest>
  confirmedCreators: ReadonlyArray<ConfirmedCampaignCreator>
  agreedContent: string
  exchange: string
  usageRights: string
  stayWindows: ReadonlyArray<CampaignStayWindow>
}>
