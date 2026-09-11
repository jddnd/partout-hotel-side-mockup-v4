import '@testing-library/jest-dom/vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { CampaignCreateDrawer } from './campaign-create-drawer'

describe('CampaignCreateDrawer', () => {
  it('uses the existing five-step campaign creation structure', () => {
    render(<CampaignCreateDrawer onClose={vi.fn()} />)

    expect(screen.getByRole('dialog', { name: 'New campaign' })).toBeInTheDocument()
    expect(screen.getByText('Basics')).toBeInTheDocument()
    expect(screen.getByText('Stay slots')).toBeInTheDocument()
    expect(screen.getByText('Terms')).toBeInTheDocument()
    expect(screen.getByText('Agreed content')).toBeInTheDocument()
    expect(screen.getByText('Review')).toBeInTheDocument()

    const continueButton = screen.getByRole('button', { name: 'Continue' })
    expect(continueButton).toBeDisabled()

    fireEvent.change(screen.getByPlaceholderText('Coastal Autumn'), { target: { value: 'Autumn Coast' } })
    expect(continueButton).toBeEnabled()

    fireEvent.click(continueButton)
    expect(screen.getByText(/Define the first stay window creators can request/)).toBeInTheDocument()
  })
})
