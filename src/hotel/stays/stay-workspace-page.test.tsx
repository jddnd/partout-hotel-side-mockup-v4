import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { StayWorkspacePage } from './stay-workspace-page'

afterEach(() => cleanup())

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
    expect(screen.getByRole('link', { name: 'Message' })).toHaveAttribute('href', '/hotel/messages?creator=sofie-larsen')
    expect(screen.getByRole('link', { name: 'View creator profile' })).toHaveAttribute('href', '/hotel/applications/sofie-larsen')
  })

  it('does not offer a creator-review link when the mock review does not exist', () => {
    render(<StayWorkspacePage stayId="daniel-kahn" />)

    expect(screen.getByRole('heading', { name: 'Daniel Kahn' })).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'View creator profile' })).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'View campaign' })).toHaveAttribute('href', '/hotel/campaigns/heritage-history')
  })
})
