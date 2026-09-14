import '@testing-library/jest-dom/vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { CampaignCreatePage } from './campaign-create-page'
import {
  canContinueCampaignCreate,
  isCampaignDraftValid,
} from './campaign-create-validation'
import type { MockCampaignDraft } from './campaign-mock-storage'

afterEach(cleanup)

const validDraft: MockCampaignDraft = {
  name: 'Autumn Residency',
  description: 'A quiet stay by the sea.',
  startDate: '2099-09-20',
  endDate: '2099-09-22',
  spots: 3,
  exchange: 'Hosted stay',
  usageRights: 'Hotel organic channels · 12 months',
  reels: 1,
  stories: 3,
  posts: 0,
}

describe('CampaignCreatePage truth parity', () => {
  it('blocks progress until the backend-grounded creation requirements are satisfied', () => {
    render(<CampaignCreatePage />)

    let continueButton = screen.getByRole('button', { name: /Continue/ })
    expect(continueButton).toBeDisabled()

    fireEvent.change(screen.getByLabelText('Campaign name'), {
      target: { value: 'Autumn Residency' },
    })
    expect(continueButton).toBeEnabled()
    fireEvent.click(continueButton)

    continueButton = screen.getByRole('button', { name: /Continue/ })
    expect(continueButton).toBeDisabled()

    fireEvent.change(screen.getByLabelText('Arrival'), {
      target: { value: '2099-09-20' },
    })
    fireEvent.change(screen.getByLabelText('Departure'), {
      target: { value: '2099-09-18' },
    })
    expect(continueButton).toBeDisabled()

    fireEvent.change(screen.getByLabelText('Departure'), {
      target: { value: '2099-09-22' },
    })
    expect(continueButton).toBeEnabled()
    fireEvent.click(continueButton)

    continueButton = screen.getByRole('button', { name: /Continue/ })
    expect(continueButton).toBeEnabled()
    fireEvent.click(continueButton)

    fireEvent.click(screen.getByRole('button', { name: 'Remove one reels' }))
    fireEvent.click(screen.getByRole('button', { name: 'Remove one stories' }))
    fireEvent.click(screen.getByRole('button', { name: 'Remove one stories' }))
    fireEvent.click(screen.getByRole('button', { name: 'Remove one stories' }))

    continueButton = screen.getByRole('button', { name: /Continue/ })
    expect(continueButton).toBeDisabled()

    fireEvent.click(screen.getByRole('button', { name: 'Add one posts' }))
    expect(continueButton).toBeEnabled()
    fireEvent.click(continueButton)

    expect(screen.getByRole('button', { name: 'Review & create' })).toBeEnabled()
  })

  it('requires explicit exchange and usage-rights truth before a draft is valid', () => {
    expect(canContinueCampaignCreate(2, validDraft, '2099-01-01')).toBe(true)
    expect(isCampaignDraftValid(validDraft, '2099-01-01')).toBe(true)

    expect(
      canContinueCampaignCreate(
        2,
        { ...validDraft, exchange: '' },
        '2099-01-01',
      ),
    ).toBe(false)
    expect(
      isCampaignDraftValid(
        { ...validDraft, usageRights: '' },
        '2099-01-01',
      ),
    ).toBe(false)
  })
})
