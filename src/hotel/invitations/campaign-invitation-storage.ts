import type { HotelCampaignInvitation } from '../../entities/campaign-invitation/campaign-invitation.types'

const CAMPAIGN_INVITATIONS_KEY = 'partout-hotel-mockup-campaign-invitations-v1'

export function getMockCampaignInvitations(
  baseInvitations: ReadonlyArray<HotelCampaignInvitation>,
): ReadonlyArray<HotelCampaignInvitation> {
  return [...readInvitations(), ...baseInvitations]
}

export function saveMockCampaignInvitation(invitation: HotelCampaignInvitation): boolean {
  if (typeof window === 'undefined') return false

  try {
    const invitations = readInvitations().filter((candidate) => candidate.id !== invitation.id)
    window.localStorage.setItem(
      CAMPAIGN_INVITATIONS_KEY,
      JSON.stringify([invitation, ...invitations]),
    )
    return true
  } catch {
    return false
  }
}

function readInvitations(): HotelCampaignInvitation[] {
  if (typeof window === 'undefined') return []

  try {
    const parsed = JSON.parse(window.localStorage.getItem(CAMPAIGN_INVITATIONS_KEY) ?? '[]')
    return Array.isArray(parsed) ? (parsed as HotelCampaignInvitation[]) : []
  } catch {
    return []
  }
}
