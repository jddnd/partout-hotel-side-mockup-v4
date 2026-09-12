export type AudienceSlice = Readonly<{
  label: string
  share: number
}>

export type SocialPlatform = 'Instagram' | 'TikTok' | 'YouTube'

export type SocialConnection = Readonly<{
  platform: SocialPlatform
  handle: string
  audience: string
}>

export type RecentCollaboration = Readonly<{
  name: string
  date: string
}>

export type PreviousStay = Readonly<{
  month: string
  title: string
}>

export type CreatorProfileReview = Readonly<{
  creatorId: string
  bio: string
  countries: ReadonlyArray<AudienceSlice>
  ages: ReadonlyArray<AudienceSlice>
  genders: ReadonlyArray<AudienceSlice>
  socialConnections: ReadonlyArray<SocialConnection>
  recentCollaborations: ReadonlyArray<RecentCollaboration>
  previousStays: ReadonlyArray<PreviousStay>
}>
