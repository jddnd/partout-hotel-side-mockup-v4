import '@testing-library/jest-dom/vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { InsightsPage } from './insights-page'

describe('InsightsPage', () => {
  it('preserves the approved owner-reference insights overview', () => {
    render(<InsightsPage />)

    expect(screen.getByRole('heading', { name: 'Insights' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Overview' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText('2.41M')).toBeInTheDocument()
    expect(screen.getByText('€612,480')).toBeInTheDocument()
    expect(screen.getByText('128')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Audience' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Top campaigns' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Content performance' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'So what?' })).toBeInTheDocument()
  })

  it('routes the approved overview drill-down actions through the Insights view state', () => {
    const onViewChange = vi.fn()
    render(<InsightsPage onViewChange={onViewChange} />)

    fireEvent.click(screen.getByRole('button', { name: 'View audience' }))
    expect(onViewChange).toHaveBeenCalledWith('audience')

    fireEvent.click(screen.getByRole('button', { name: 'View content' }))
    expect(onViewChange).toHaveBeenCalledWith('content')
  })

  it('renders the booking attribution prototype as a distinct view', () => {
    render(<InsightsPage activeView="bookings" />)

    expect(screen.getByRole('tab', { name: 'Bookings' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('heading', { name: 'Bookings by campaign' })).toBeInTheDocument()
    expect(screen.getByText('€89,760')).toBeInTheDocument()
    expect(screen.getByText(/Attribution preview/)).toBeInTheDocument()
  })
})
