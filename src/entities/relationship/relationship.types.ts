export type HotelRelationship = Readonly<{
  id: string
  creatorId: string
  label: string
  detail: string
  knownSince: string
  previousStays: ReadonlyArray<string>
}>

export type RelationshipContext = Readonly<{
  relationshipId: string
  campaign: string
  campaignId: string
  campaignDates: string
  currentContext: string
  listContextLabel: string
  stayId?: string
  room?: string
  checkIn?: string
  checkOut?: string
  agreedContentCompleted?: number
  agreedContentTotal?: number
}>
