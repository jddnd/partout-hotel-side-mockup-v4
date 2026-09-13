import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import type { HotelCampaignInvitation } from '../../entities/campaign-invitation/campaign-invitation.types'
import { saveMockCampaignInvitation } from './campaign-invitation-storage'
import { SentInvitationsSection } from './sent-invitations-section'

beforeEach(() => window.localStorage.clear())
afterEach(() => cleanup())

const pendingInvitation: HotelCampaignInvitation = {
  id: 'invitation-ui-daniel-coastal',
  creatorId: 'daniel-kahn',
  campaignId: 'coastal-escape',
  status: 'PENDING',
  createdAt: '2026-09-13T20:00:00.000Z',
  respondBy: null,
}

describe('SentInvitationsSection', () => {
  it('renders nothing when the campaign has no sent invitations', () => {
    const { container } = render(<SentInvitationsSection campaignId="coastal-escape" />)

    expect(container).toBeEmptyDOMElement()
  })

  it('shows a pending invitation with the Hotel cancel action', () => {
    expect(saveMockCampaignInvitation(pendingInvitation)).toBe(true)
    render(<SentInvitationsSection campaignId="coastal-escape" />)

    expect(screen.getByRole('heading', { name: 'Sent invitations' })).toBeInTheDocument()
    expect(screen.getByText('Daniel Kahn')).toBeInTheDocument()
    expect(screen.getByText('Pending')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Cancel invitation' })).toBeInTheDocument()
  })

  it('does not offer a Hotel cancel action for a creator-closed invitation', () => {
    expect(saveMockCampaignInvitation({ ...pendingInvitation, status: 'ACCEPTED' })).toBe(true)
    render(<SentInvitationsSection campaignId="coastal-escape" />)

    expect(screen.getByText('Accepted')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Cancel invitation' })).not.toBeInTheDocument()
  })
})
