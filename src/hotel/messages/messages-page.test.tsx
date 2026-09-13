import '@testing-library/jest-dom/vitest'
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { MessagesPage } from './messages-page'

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

  it('sends human hotel text through the existing composer and updates the same relationship conversation', () => {
    render(<MessagesPage selectedCreatorId="james-holloway" />)

    const thread = screen.getByRole('region', { name: 'Conversation with James Holloway' })
    const composer = within(thread).getByLabelText('Message James Holloway')

    fireEvent.change(composer, { target: { value: '  Welcome, James — see you shortly.  ' } })
    fireEvent.submit(composer.closest('form')!)

    expect(within(thread).getByText('Welcome, James — see you shortly.')).toBeInTheDocument()
    expect(composer).toHaveValue('')
    expect(
      within(screen.getByRole('region', { name: 'Conversations' })).getByText(
        'Welcome, James — see you shortly.',
      ),
    ).toBeInTheDocument()
  })
})
