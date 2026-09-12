export type HotelApplication = Readonly<{
  id: string
  creatorId: string
  campaignId: string
  campaignName: string
  requestedDates: string
  pitch: string
  fitScore: string
}>

export type ShortlistCreator = Readonly<{
  id: string
  name: string
  location: string
  fitScore: string
}>
