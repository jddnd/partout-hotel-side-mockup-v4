import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { InsightsPage } from './insights-page'

describe('InsightsPage', () => {
  it('renders the owner-reference insights overview', () => {
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
})
