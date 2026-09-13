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
  it('keeps Hold visible and routes Decline through the supplied action', () => {
    const onDecline = vi.fn()

    render(
      <ApplicationCard
        application={application}
        creator={creator}
        onAccept={vi.fn()}
        onDecline={onDecline}
      />,
    )

    expect(screen.getByRole('button', { name: 'Hold' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Decline' }))

    expect(onDecline).toHaveBeenCalledTimes(1)
  })
})
