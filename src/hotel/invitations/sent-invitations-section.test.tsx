import '@testing-library/jest-dom/vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import type { HotelCampaignInvitation } from '../../entities/campaign-invitation/campaign-invitation.types'
import { getMockCampaignInvitations, saveMockCampaignInvitation } from './campaign-invitation-storage'
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

  it('shows a pending invitation and cancels it in place', () => {
    expect(saveMockCampaignInvitation(pendingInvitation)).toBe(true)
    render(<SentInvitationsSection campaignId="coastal-escape" />)

    expect(screen.getByRole('heading', { name: 'Sent invitations' })).toBeInTheDocument()
    expect(screen.getByText('Daniel Kahn')).toBeInTheDocument()
    expect(screen.getByText('Pending')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Cancel invitation' }))

    expect(screen.getByText('Cancelled')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Cancel invitation' })).not.toBeInTheDocument()
    expect(
      getMockCampaignInvitations([]).find((candidate) => candidate.id === pendingInvitation.id)?.status,
    ).toBe('CANCELLED')
  })

  it('does not offer a Hotel cancel action for a creator-closed invitation', () => {
    expect(saveMockCampaignInvitation({ ...pendingInvitation, status: 'ACCEPTED' })).toBe(true)
    render(<SentInvitationsSection campaignId="coastal-escape" />)

    expect(screen.getByText('Accepted')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Cancel invitation' })).not.toBeInTheDocument()
  })
})
