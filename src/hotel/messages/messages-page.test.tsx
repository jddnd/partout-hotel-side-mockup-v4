import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MessagesPage } from './messages-page'

describe('MessagesPage', () => {
  it('renders the three-pane hotel conversation workspace', () => {
    render(<MessagesPage />)

    expect(screen.getByRole('heading', { name: 'Messages' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /Inbox/ })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('region', { name: 'Conversations' })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: 'Conversation with Sofie Larsen' })).toBeInTheDocument()
    expect(screen.getByRole('complementary', { name: 'Conversation context' })).toBeInTheDocument()
    expect(screen.getByText('3 of 4 published')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Send/ })).toBeInTheDocument()
  })
})
