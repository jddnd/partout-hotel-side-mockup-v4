import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ProfileReviewPage } from './profile-review-page'

describe('ProfileReviewPage', () => {
  it('renders the relationship-first creator review surface', () => {
    render(<ProfileReviewPage creatorId="sofie-larsen" />)

    expect(screen.getByRole('heading', { name: 'Sofie Larsen' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Coastal Escape' })).toBeInTheDocument()
    expect(screen.getByText('Why this stay')).toBeInTheDocument()
    expect(screen.getByText('124K')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Audience overview' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Social connections' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'You already know them' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Recent collaborations' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Accept creator' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Message first' })).toHaveAttribute('href', '/hotel/messages')
  })
})
