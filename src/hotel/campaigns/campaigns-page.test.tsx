import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { CampaignsPage } from './campaigns-page'

describe('CampaignsPage', () => {
  it('renders the owner-reference campaigns table', () => {
    render(<CampaignsPage />)

    expect(screen.getByRole('heading', { name: 'Campaigns' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Create campaign/ })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /Active/ })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText('Coastal Escape')).toBeInTheDocument()
    expect(screen.getByText('Family Getaway')).toBeInTheDocument()
    expect(screen.getAllByRole('row')).toHaveLength(6)
    expect(screen.getByText('Showing 1–5 of 5 campaigns')).toBeInTheDocument()
  })
})
