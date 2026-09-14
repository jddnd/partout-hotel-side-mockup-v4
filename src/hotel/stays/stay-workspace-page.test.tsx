import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { creators } from '../../data/mock/creators'
import { conversations } from '../../data/mock/messages'
import { relationships } from '../../data/mock/relationships'
import { stays } from '../../data/mock/stays'
import { getStayCreatorProfileHref, getStayMessageHref } from './stay-navigation'
import { assignRoomReference } from './stay-room-reference'
import { StayWorkspacePage } from './stay-workspace-page'

beforeEach(() => window.localStorage.clear())
afterEach(() => {
  cleanup()
  window.localStorage.clear()
})

describe('StayWorkspacePage', () => {
  it('keeps the creator relationship and stay agreement together', () => {
    render(<StayWorkspacePage stayId="sofie-larsen" />)

    expect(screen.getByRole('heading', { name: 'Sofie Larsen' })).toBeInTheDocument()
    expect(screen.getByText('Dinner · 19:30')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'The stay' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Content from this stay' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '3rd stay together' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Coastal Escape' })).toBeInTheDocument()
    expect(screen.getByText(/shared progress, not an approval workflow/i)).toBeInTheDocument()
  })

  it('shows an updated room reference in the existing Stay details', () => {
    assignRoomReference('sofie-larsen', 'Garden 412')
    render(<StayWorkspacePage stayId="sofie-larsen" />)

    expect(screen.getByText('Garden 412')).toBeInTheDocument()
    expect(screen.queryByText('Sea View 214')).not.toBeInTheDocument()
  })

  it.each(stays.map((stay) => [stay.id, stay.creatorName]))(
    'renders a workspace for stay %s',
    (stayId, creatorName) => {
      render(<StayWorkspacePage stayId={stayId} />)

      expect(screen.getByRole('heading', { name: creatorName })).toBeInTheDocument()
      expect(screen.queryByText('Collaboration not found')).not.toBeInTheDocument()
    },
  )

  it.each(stays)('routes $id through explicit related entity identities', (stay) => {
    render(<StayWorkspacePage stayId={stay.id} />)

    expect(screen.getByRole('link', { name: 'Message' })).toHaveAttribute('href', getStayMessageHref(stay))
    expect(screen.getByRole('link', { name: 'View creator profile' })).toHaveAttribute('href', getStayCreatorProfileHref(stay))
    expect(screen.getByRole('link', { name: 'View campaign' })).toHaveAttribute(
      'href',
      `/hotel/campaigns/${encodeURIComponent(stay.campaignId)}`,
    )
  })

  it('only references creator and relationship identities that exist', () => {
    const creatorIds = new Set(creators.map((creator) => creator.id))
    const relationshipIds = new Set(relationships.map((relationship) => relationship.id))

    for (const stay of stays) {
      expect(creatorIds.has(stay.creatorId)).toBe(true)
      expect(relationshipIds.has(stay.relationshipId)).toBe(true)
    }
  })

  it('resolves conversations through relationships rather than storing them on stays', () => {
    for (const stay of stays) {
      const conversation = conversations.find((candidate) => candidate.relationshipId === stay.relationshipId)
      expect(getStayMessageHref(stay)).toBe(
        conversation ? `/hotel/messages?creator=${encodeURIComponent(conversation.creatorId)}` : '/hotel/messages',
      )
    }
  })

  it('keeps actions visible when a conversation is unavailable', () => {
    render(<StayWorkspacePage stayId="daniel-kahn" />)

    expect(screen.getByRole('link', { name: 'Message' })).toHaveAttribute('href', '/hotel/messages')
    expect(screen.getByRole('link', { name: 'View creator profile' })).toHaveAttribute('href', '/hotel/creators/daniel-kahn')
  })
})