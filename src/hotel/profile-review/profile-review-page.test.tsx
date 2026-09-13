import '@testing-library/jest-dom/vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { getPersistedApplicationApproval } from '../applications/application-approval-action'
import { ProfileReviewPage } from './profile-review-page'

describe('ProfileReviewPage', () => {
  beforeEach(() => window.localStorage.clear())

  it('renders the relationship-first creator review surface', () => {
    render(<ProfileReviewPage creatorId="sofie-larsen" />)

    expect(screen.getByRole('heading', { name: 'Sofie Larsen' })).toBeInTheDocument()
    expect(screen.getAllByRole('heading', { name: 'Coastal Escape' })).toHaveLength(2)
    expect(screen.getByText('Why this stay')).toBeInTheDocument()
    expect(screen.getByText('124K')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Audience overview' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Social connections' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'You already know them' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Recent collaborations' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Accept creator' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Message first' })).toHaveAttribute('href', '/hotel/messages?creator=sofie-larsen')
  })

  it('routes Accept creator through the same application approval workflow', () => {
    render(<ProfileReviewPage creatorId="sofie-larsen" />)

    fireEvent.click(screen.getByRole('button', { name: 'Accept creator' }))

    expect(getPersistedApplicationApproval('coastal-escape-sofie-larsen')?.collaboration.id).toBe(
      'collaboration-coastal-escape-sofie-larsen',
    )
  })
})
