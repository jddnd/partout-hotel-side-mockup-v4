export type ConversationStatus = 'Active stay' | 'Upcoming stay' | 'Application'

export type HotelConversation = Readonly<{
  id: string
  creatorName: string
  initials: string
  preview: string
  timestamp: string
  unread?: number
  status: ConversationStatus
  campaign: string
}>

export type ChatMessage = Readonly<{
  id: string
  sender: 'creator' | 'hotel'
  body: string
  timestamp: string
}>

export type ConversationContext = Readonly<{
  campaign: string
  campaignDates: string
  stayStatus: string
  room: string
  checkIn: string
  checkOut: string
  agreedContentCompleted: number
  agreedContentTotal: number
}>
