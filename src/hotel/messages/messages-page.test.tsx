import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { MessagesPage } from './messages-page'

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
})
