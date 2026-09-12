export type StayStatus = 'In house' | 'Arrives today' | 'Tomorrow' | 'Upcoming'

export type HotelStay = Readonly<{
  id: string
  creatorId: string
  conversationId?: string
  creatorName: string
  initials: string
  location: string
  dates: string
  campaign: string
  campaignId: string
  room: string
  status: StayStatus
  checkIn: string
  checkOut: string
  agreedContentCompleted: number
  agreedContentTotal: number
  relationshipLabel: string
  relationshipNote: string
  nextMoment?: string
}>

export type StayTab = Readonly<{
  label: string
  count: number
  active?: boolean
}>
