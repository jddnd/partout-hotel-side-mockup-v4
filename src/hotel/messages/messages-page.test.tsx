import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { conversations } from '../../data/mock/messages'
import { MessagesPage } from './messages-page'
import { sendMockRelationshipMessage } from './relationship-message-send-action'

beforeEach(() => window.localStorage.clear())
afterEach(() => cleanup())

describe('MessagesPage', () => {
  it('renders the relationship-first hotel conversation workspace', () => {
    render(<MessagesPage />)

    expect(screen.getByRole('heading', { name: 'Messages' })).toBeInTheDocument()
    expect(screen.getByText('One conversation for every creator relationship.')).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /All/ })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('region', { name: 'Conversations' })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: 'Conversation with Sofie Larsen' })).toBeInTheDocument()
    expect(screen.getByRole('complementary', { name: 'Conversation context' })).toBeInTheDocument()
    expect(screen.getAllByText('3rd stay together').length).toBeGreaterThan(1)
    expect(screen.getByText('Observed publishing progress only — nothing to approve here.')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'View current stay' })).toHaveAttribute('href', '/hotel/stays/sofie-larsen')
    expect(screen.queryByRole('button', { name: 'Call' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Video' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Attach file' })).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Send/ })).toBeInTheDocument()
  })

  it('can open another creator relationship directly', () => {
    render(<MessagesPage selectedCreatorId="clara-moreau" />)

    expect(screen.getByRole('region', { name: 'Conversation with Clara Moreau' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'View current stay' })).toHaveAttribute('href', '/hotel/stays/clara-moreau')
    expect(screen.getAllByText('2nd stay together').length).toBeGreaterThan(1)
  })

  it('hydrates a persisted hotel Message into the same relationship thread and conversation preview', () => {
    const james = conversations.find((conversation) => conversation.id === 'james-holloway')
    expect(james).toBeDefined()
    if (!james) return

    expect(
      sendMockRelationshipMessage(
        james,
        'Welcome, James — see you shortly.',
        new Date(2026, 8, 14, 1, 18),
      ).kind,
    ).toBe('sent')

    render(<MessagesPage selectedCreatorId="james-holloway" />)

    const thread = screen.getByRole('region', { name: 'Conversation with James Holloway' })
    const composer = within(thread).getByLabelText('Message James Holloway')

    expect(within(thread).getByText('Welcome, James — see you shortly.')).toBeInTheDocument()
    expect(composer).toBeRequired()
    expect(
      within(screen.getByRole('region', { name: 'Conversations' })).getByText(
        'Welcome, James — see you shortly.',
      ),
    ).toBeInTheDocument()
  })
})
