export type StayStatus = 'In house' | 'Arrives today' | 'Tomorrow' | 'Upcoming'

export type HotelStay = Readonly<{
  id: string
  creatorName: string
  initials: string
  dates: string
  campaign: string
  room: string
  status: StayStatus
  checkIn: string
  checkOut: string
  agreedContentCompleted: number
  agreedContentTotal: number
  nextMoment?: string
}>

export type StayTab = Readonly<{
  label: string
  count: number
  active?: boolean
}>
