import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { TodayPage } from './today-page'

describe('TodayPage', () => {
  it('renders the operational overview with real continuity destinations', () => {
    render(<TodayPage />)

    expect(screen.getByRole('heading', { name: 'Today' })).toBeInTheDocument()
    expect(screen.getByText('Pending applications')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Create campaign' })).toHaveAttribute('href', '/hotel/campaigns/new')
    expect(screen.getByRole('link', { name: 'Invite talent' })).toHaveAttribute('href', '/hotel/campaigns')
    expect(screen.getByRole('link', { name: 'Send message' })).toHaveAttribute('href', '/hotel/messages')
    expect(screen.queryByText('Assign room')).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Applications need review/ })).toHaveAttribute('href', '/hotel/applications')
    expect(screen.getByRole('link', { name: /Underperforming campaign/ })).toHaveAttribute('href', '/hotel/insights?view=campaigns')
    expect(screen.getByRole('link', { name: /Sofie Larsen/ })).toHaveAttribute('href', '/hotel/stays/sofie-larsen')
    expect(screen.getByRole('link', { name: 'View all arrivals' })).toHaveAttribute('href', '/hotel/stays')
    expect(screen.getByText('Stay timeline')).toBeInTheDocument()
    expect(screen.getAllByRole('img', { name: 'Sofie Larsen' })).toHaveLength(2)
  })
})
