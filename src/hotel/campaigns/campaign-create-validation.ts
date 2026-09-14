import type { MockCampaignDraft } from './campaign-mock-storage'

export function isCampaignStayWindowValid(
  draft: Pick<MockCampaignDraft, 'startDate' | 'endDate' | 'spots'>,
  todayIso = new Date().toISOString().slice(0, 10),
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
  todayIso = new Date().toISOString().slice(0, 10),
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
  todayIso = new Date().toISOString().slice(0, 10),
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
