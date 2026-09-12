import type { CampaignDetail, CampaignStatus, HotelCampaign } from './campaigns.types'

const CAMPAIGNS_KEY = 'partout-hotel-mockup-created-campaigns-v1'
const DETAILS_KEY = 'partout-hotel-mockup-created-campaign-details-v1'

export type MockCampaignDraft = Readonly<{
  name: string
  description: string
  startDate: string
  endDate: string
  spots: number
  exchange: string
  usageRights: string
  reels: number
  stories: number
  posts: number
}>

export function getMockCampaigns(baseCampaigns: ReadonlyArray<HotelCampaign>): ReadonlyArray<HotelCampaign> {
  return [...readCampaigns(), ...baseCampaigns]
}

export function getMockCampaignDetail(campaignId: string): CampaignDetail | undefined {
  if (typeof window === 'undefined') return undefined

  try {
    const parsed = JSON.parse(window.localStorage.getItem(DETAILS_KEY) ?? '{}') as Record<string, CampaignDetail>
    return parsed[campaignId]
  } catch {
    return undefined
  }
}

export function saveMockCampaign(draft: MockCampaignDraft): boolean {
  if (typeof window === 'undefined') return false

  try {
    const id = `${slugify(draft.name)}-${Date.now().toString(36)}`
    const campaign: HotelCampaign = {
      id,
      name: draft.name.trim(),
      subtitle: draft.description.trim() || 'Creator stay campaign',
      dates: formatDateRange(draft.startDate, draft.endDate),
      status: deriveStatus(draft.startDate),
      deliverables: { reels: draft.reels, stories: draft.stories, posts: draft.posts },
      talent: [],
      estimatedReach: '—',
      estimatedEmv: '—',
      bookings: '—',
      progress: 0,
    }

    const detail: CampaignDetail = {
      openUntil: draft.startDate ? formatDate(draft.startDate) : 'Not set',
      selectionLimit: draft.spots,
      confirmedCount: 0,
      pendingCreators: [],
      confirmedCreators: [],
      agreedContent: formatContent(draft),
      exchange: draft.exchange,
      usageRights: draft.usageRights,
      stayWindows: [
        {
          label: formatDateRange(draft.startDate, draft.endDate),
          filled: 0,
          total: draft.spots,
          status: 'Open',
        },
      ],
    }

    const campaigns = readCampaigns().filter((item) => item.id !== id)
    window.localStorage.setItem(CAMPAIGNS_KEY, JSON.stringify([campaign, ...campaigns]))

    const details = readDetails()
    window.localStorage.setItem(DETAILS_KEY, JSON.stringify({ ...details, [id]: detail }))
    return true
  } catch {
    return false
  }
}

function readCampaigns(): HotelCampaign[] {
  if (typeof window === 'undefined') return []

  try {
    const parsed = JSON.parse(window.localStorage.getItem(CAMPAIGNS_KEY) ?? '[]')
    return Array.isArray(parsed) ? (parsed as HotelCampaign[]) : []
  } catch {
    return []
  }
}

function readDetails(): Record<string, CampaignDetail> {
  if (typeof window === 'undefined') return {}

  try {
    const parsed = JSON.parse(window.localStorage.getItem(DETAILS_KEY) ?? '{}')
    return parsed && typeof parsed === 'object' ? (parsed as Record<string, CampaignDetail>) : {}
  } catch {
    return {}
  }
}

function deriveStatus(startDate: string): CampaignStatus {
  if (!startDate) return 'Draft'
  const start = new Date(`${startDate}T00:00:00`)
  return Number.isNaN(start.getTime()) || start.getTime() <= Date.now() ? 'Active' : 'Upcoming'
}

function formatDateRange(startDate: string, endDate: string) {
  if (!startDate && !endDate) return 'Dates not set'
  if (!startDate) return `Until ${formatDate(endDate)}`
  if (!endDate) return `From ${formatDate(startDate)}`
  return `${formatDate(startDate)} – ${formatDate(endDate)}`
}

function formatDate(value: string) {
  if (!value) return 'Not set'
  const date = new Date(`${value}T00:00:00`)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat('en', { day: 'numeric', month: 'short', year: 'numeric' }).format(date)
}

function formatContent(draft: MockCampaignDraft) {
  const parts = [
    draft.reels > 0 ? `${draft.reels} ${draft.reels === 1 ? 'Reel' : 'Reels'}` : null,
    draft.stories > 0 ? `${draft.stories} ${draft.stories === 1 ? 'Story' : 'Stories'}` : null,
    draft.posts > 0 ? `${draft.posts} ${draft.posts === 1 ? 'Post' : 'Posts'}` : null,
  ].filter(Boolean)

  return parts.length > 0 ? parts.join(' · ') : 'No content expectations added'
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'campaign'
}
