import '@testing-library/jest-dom/vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import type { Creator } from '../../entities/creator/creator.types'
import type { HotelApplication } from './applications.types'
import { ApplicationCard } from './application-card'

const application: HotelApplication = {
  id: 'application-test',
  creatorId: 'creator-test',
  campaignId: 'campaign-test',
  campaignName: 'Test campaign',
  requestedDates: 'Jun 1–3',
  pitch: 'Test pitch',
  fitScore: '90%',
}

const creator: Creator = {
  id: 'creator-test',
  name: 'Test Creator',
  initials: 'TC',
}

describe('ApplicationCard decision actions', () => {
  it('keeps Hold visible, exposes its pressed state, and routes Hold and Decline through supplied actions', () => {
    const onHold = vi.fn()
    const onDecline = vi.fn()

    render(
      <ApplicationCard
        application={application}
        creator={creator}
        onAccept={vi.fn()}
        onHold={onHold}
        onDecline={onDecline}
        holdActive
      />,
    )

    const hold = screen.getByRole('button', { name: 'Hold' })
    expect(hold).toBeInTheDocument()
    expect(hold).toHaveAttribute('aria-pressed', 'true')

    fireEvent.click(hold)
    fireEvent.click(screen.getByRole('button', { name: 'Decline' }))

    expect(onHold).toHaveBeenCalledTimes(1)
    expect(onDecline).toHaveBeenCalledTimes(1)
  })

  it('keeps Hold visible but disabled when the Application is not pending', () => {
    render(
      <ApplicationCard
        application={application}
        creator={creator}
        onAccept={vi.fn()}
        onHold={vi.fn()}
        onDecline={vi.fn()}
        holdDisabled
      />,
    )

    expect(screen.getByRole('button', { name: 'Hold' })).toBeDisabled()
  })
})
