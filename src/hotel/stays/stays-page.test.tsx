import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { assignRoomReference } from './stay-room-reference'
import { StaysPage } from './stays-page'

beforeEach(() => window.localStorage.clear())
afterEach(() => {
  cleanup()
  window.localStorage.clear()
})

describe('StaysPage', () => {
  it('renders a relationship-aware creator stay surface', () => {
    render(<StaysPage />)

    expect(screen.getByRole('heading', { name: 'Stays' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /Active/ })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getAllByText('Sofie Larsen')).toHaveLength(2)
    expect(screen.getByText('Sea View 214')).toBeInTheDocument()
    expect(screen.getByText('3 of 4 published')).toBeInTheDocument()
    expect(screen.getByText('3rd stay together')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'View profile' })).toHaveAttribute('href', '/hotel/creators/sofie-larsen')
    expect(screen.getByRole('link', { name: /Message/ })).toHaveAttribute('href', '/hotel/messages?creator=sofie-larsen')
    expect(screen.getByRole('link', { name: /Open collaboration/ })).toHaveAttribute('href', '/hotel/stays/sofie-larsen')
  })

  it('renders the browser-local room reference update without changing the Stay', () => {
    assignRoomReference('sofie-larsen', 'Garden 412')
    render(<StaysPage />)

    expect(screen.getByText('Garden 412')).toBeInTheDocument()
    expect(screen.queryByText('Sea View 214')).not.toBeInTheDocument()
    expect(screen.getAllByText('Sofie Larsen')).toHaveLength(2)
    expect(screen.getByRole('link', { name: /Open collaboration/ })).toHaveAttribute('href', '/hotel/stays/sofie-larsen')
  })
})
