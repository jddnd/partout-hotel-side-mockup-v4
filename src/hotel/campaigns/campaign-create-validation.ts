import type { MockCampaignDraft } from './campaign-mock-storage'

function localTodayIso() {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function isCampaignStayWindowValid(
  draft: Pick<MockCampaignDraft, 'startDate' | 'endDate' | 'spots'>,
  todayIso = localTodayIso(),
) {
  const start = draft.startDate.trim()
  const end = draft.endDate.trim()

  if (!start || !end) return false
  if (end < start) return false
  if (end < todayIso) return false
  if (!Number.isFinite(draft.spots) || draft.spots < 1) return false

  return true
}

export function hasCampaignTerms(
  draft: Pick<MockCampaignDraft, 'exchange' | 'usageRights'>,
) {
  return draft.exchange.trim().length > 0 && draft.usageRights.trim().length > 0
}

export function hasAgreedContent(
  draft: Pick<MockCampaignDraft, 'reels' | 'stories' | 'posts'>,
) {
  return draft.reels + draft.stories + draft.posts > 0
}

export function isCampaignDraftValid(
  draft: MockCampaignDraft,
  todayIso = localTodayIso(),
) {
  return (
    draft.name.trim().length > 0 &&
    isCampaignStayWindowValid(draft, todayIso) &&
    hasCampaignTerms(draft) &&
    hasAgreedContent(draft)
  )
}

export function canContinueCampaignCreate(
  step: number,
  draft: MockCampaignDraft,
  todayIso = localTodayIso(),
) {
  switch (step) {
    case 0:
      return draft.name.trim().length > 0
    case 1:
      return isCampaignStayWindowValid(draft, todayIso)
    case 2:
      return hasCampaignTerms(draft)
    case 3:
      return hasAgreedContent(draft)
    case 4:
      return isCampaignDraftValid(draft, todayIso)
    default:
      return false
  }
}
