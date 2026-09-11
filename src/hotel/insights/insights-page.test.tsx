import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { InsightsPage } from './insights-page'

describe('InsightsPage', () => {
  it('renders measurable outcomes without invented ranking or attribution', () => {
    render(<InsightsPage />)

    expect(screen.getByRole('heading', { name: 'Insights' })).toBeInTheDocument()
    expect(screen.getByText('1.12M')).toBeInTheDocument()
    expect(screen.getByText('84K')).toBeInTheDocument()
    expect(screen.getByText('3,842')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '59 pieces published' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Campaign contribution' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Creators behind the work' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Content behind the result' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Coastal Escape is carrying the strongest measured reach/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Open Coastal Escape' })).toHaveAttribute('href', '/hotel/campaigns/coastal-escape')
    expect(screen.getByRole('link', { name: /Sofie Larsen/ })).toHaveAttribute('href', '/hotel/messages?creator=sofie-larsen')
    expect(screen.queryByText('€612,480')).not.toBeInTheDocument()
    expect(screen.queryByText('4.28%')).not.toBeInTheDocument()
  })
})
