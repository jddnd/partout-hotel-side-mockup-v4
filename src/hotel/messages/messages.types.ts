export type MessageView = 'all' | 'unread'

export type HotelConversation = Readonly<{
  id: string
  creatorName: string
  initials: string
  preview: string
  timestamp: string
  unread?: number
  relationshipLabel: string
  contextLabel: string
  stayId?: string
}>

export type ChatMessage = Readonly<{
  id: string
  sender: 'creator' | 'hotel'
  body: string
  timestamp: string
}>

export type ConversationContext = Readonly<{
  relationshipLabel: string
  relationshipDetail: string
  knownSince: string
  campaign: string
  campaignId: string
  campaignDates: string
  currentContext: string
  stayId?: string
  room?: string
  checkIn?: string
  checkOut?: string
  agreedContentCompleted?: number
  agreedContentTotal?: number
  previousStays: ReadonlyArray<string>
}>
