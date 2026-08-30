export type HotelApplication = {
  id: string
  name: string
  location: string
  followers: string
  engagementRate: string
  audienceQuality: string
  fitScore: string
  topAudience: string
  audienceShare: string
  contentFocus: string
  previousStays: string
}

export type ShortlistCreator = Pick<HotelApplication, 'id' | 'name' | 'location' | 'fitScore'>
