import type { CampaignDetail } from '../../hotel/campaigns/campaigns.types'

export const campaignDetails: Readonly<Record<string, CampaignDetail>> = {
  'coastal-escape': {
    openUntil: 'Apr 20, 2025',
    selectionLimit: 6,
    confirmedCount: 4,
    pendingCreators: [
      {
        id: 'sofie-larsen',
        name: 'Sofie Larsen',
        initials: 'SL',
        location: 'Copenhagen, Denmark',
        audience: '124K followers · 4.6% engagement',
        preferredDates: 'May 5–7',
      },
      {
        id: 'james-holloway',
        name: 'James Holloway',
        initials: 'JH',
        location: 'Sydney, Australia',
        audience: '256K followers · 3.1% engagement',
        preferredDates: 'May 18–20',
      },
    ],
    confirmedCreators: [
      { name: 'Clara Moreau', initials: 'CM', dates: 'May 2–4' },
      { name: 'Ida Møller', initials: 'IM', dates: 'May 9–11' },
      { name: 'Anna Berg', initials: 'AB', dates: 'May 16–18' },
      { name: 'Sofie Larsen', initials: 'SL', dates: 'May 23–25' },
    ],
    agreedContent: '6 Reels · 8 Stories · 6 Posts',
    exchange: 'Hosted stay · breakfast · spa access',
    usageRights: 'Organic hotel channels · 12 months',
    stayWindows: [
      { label: 'May 1–10', filled: 2, total: 2, status: 'Full' },
      { label: 'May 11–20', filled: 1, total: 2, status: 'Open' },
      { label: 'May 21–31', filled: 1, total: 2, status: 'Open' },
    ],
  },
  'summer-wellness': {
    openUntil: 'May 22, 2025',
    selectionLimit: 5,
    confirmedCount: 3,
    pendingCreators: [
      {
        id: 'clara-moreau',
        name: 'Clara Moreau',
        initials: 'CM',
        location: 'Paris, France',
        audience: '199K followers · 5.1% engagement',
        preferredDates: 'Jun 12–14',
      },
    ],
    confirmedCreators: [
      { name: 'Sofie Larsen', initials: 'SL', dates: 'Jun 3–5' },
      { name: 'Ida Møller', initials: 'IM', dates: 'Jun 17–19' },
      { name: 'Maya Holm', initials: 'MH', dates: 'Jun 24–26' },
    ],
    agreedContent: '4 Reels · 6 Stories · 4 Posts',
    exchange: 'Hosted stay · wellness treatment',
    usageRights: 'Organic hotel channels · 12 months',
    stayWindows: [
      { label: 'Jun 1–15', filled: 1, total: 2, status: 'Open' },
      { label: 'Jun 16–30', filled: 2, total: 3, status: 'Open' },
    ],
  },
}
