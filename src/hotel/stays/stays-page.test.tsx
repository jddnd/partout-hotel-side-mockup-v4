import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { StaysPage } from './stays-page'

describe('StaysPage', () => {
  it('renders a relationship-aware creator stay surface', () => {
    render(<StaysPage />)

    expect(screen.getByRole('heading', { name: 'Stays' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /Active/ })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getAllByText('Sofie Larsen')).toHaveLength(2)
    expect(screen.getByText('Sea View 214')).toBeInTheDocument()
    expect(screen.getByText('3 of 4 published')).toBeInTheDocument()
    expect(screen.getByText('3rd stay together')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'View profile' })).toHaveAttribute('href', '/hotel/applications/sofie-larsen')
    expect(screen.getByRole('link', { name: /Message/ })).toHaveAttribute('href', '/hotel/messages?creator=sofie-larsen')
    expect(screen.getByRole('link', { name: /Open collaboration/ })).toHaveAttribute('href', '/hotel/stays/sofie-larsen')
  })
})
