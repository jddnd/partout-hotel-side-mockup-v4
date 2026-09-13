import '@testing-library/jest-dom/vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { ProfileReviewSidePanel } from './profile-review-side-panel'

describe('ProfileReviewSidePanel decision actions', () => {
  it('routes Decline request through the supplied action without changing the existing decision controls', () => {
    const onDecline = vi.fn()

    render(
      <ProfileReviewSidePanel
        creatorId="creator-test"
        creatorName="Test Creator"
        application={{ campaignName: 'Test campaign', requestedDates: 'Jun 1–3', pitch: 'Test pitch' }}
        socialConnections={[]}
        previousStays={[]}
        onAccept={vi.fn()}
        onDecline={onDecline}
      />,
    )

    expect(screen.getByRole('button', { name: 'Accept creator' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Message first' })).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Decline request' }))

    expect(onDecline).toHaveBeenCalledTimes(1)
  })
})
