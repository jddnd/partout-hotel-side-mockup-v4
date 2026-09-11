import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { StayWorkspacePage } from './stay-workspace-page'

describe('StayWorkspacePage', () => {
  it('keeps the creator relationship and stay agreement together', () => {
    render(<StayWorkspacePage stayId="sofie-larsen" />)

    expect(screen.getByRole('heading', { name: 'Sofie Larsen' })).toBeInTheDocument()
    expect(screen.getByText('Dinner · 19:30')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'The stay' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Content from this stay' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '3rd stay together' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Coastal Escape' })).toBeInTheDocument()
    expect(screen.getByText('This is shared progress, not an approval workflow.')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Message' })).toHaveAttribute('href', '/hotel/messages')
  })
})
