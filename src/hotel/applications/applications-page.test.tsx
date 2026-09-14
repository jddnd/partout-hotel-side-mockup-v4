import '@testing-library/jest-dom/vitest'
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { getPersistedApplicationApproval } from './application-approval-action'
import { getPersistedApplicationHold } from './application-hold-action'
import { ApplicationsPage } from './applications-page'

describe('ApplicationsPage', () => {
  beforeEach(() => window.localStorage.clear())
  afterEach(() => cleanup())

  it('renders the decision queue and shortlist including the grounded pending Application', () => {
    render(<ApplicationsPage />)

    expect(screen.getByRole('heading', { name: 'Applications' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /All applications/ })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('heading', { name: 'Sofie Larsen' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Anna Berg' })).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: 'Accept' })).toHaveLength(4)
    expect(screen.getByRole('heading', { name: 'Shortlist (4)' })).toBeInTheDocument()
  })

  it('routes Accept through the shared application approval workflow', () => {
    render(<ApplicationsPage />)

    fireEvent.click(screen.getAllByRole('button', { name: 'Accept' })[0])

    expect(getPersistedApplicationApproval('coastal-escape-sofie-larsen')?.collaboration.id).toBe(
      'collaboration-coastal-escape-sofie-larsen',
    )
  })

  it('enables Hold only for the pending Application and toggles the private Hotel state', () => {
    render(<ApplicationsPage />)

    const sofieCard = screen.getByRole('heading', { name: 'Sofie Larsen' }).closest('article')
    const annaCard = screen.getByRole('heading', { name: 'Anna Berg' }).closest('article')
    expect(sofieCard).not.toBeNull()
    expect(annaCard).not.toBeNull()
    if (!sofieCard || !annaCard) return

    expect(within(sofieCard).getByRole('button', { name: 'Hold' })).toBeDisabled()

    const annaHold = within(annaCard).getByRole('button', { name: 'Hold' })
    expect(annaHold).toBeEnabled()
    expect(annaHold).toHaveAttribute('aria-pressed', 'false')

    fireEvent.click(annaHold)
    expect(annaHold).toHaveAttribute('aria-pressed', 'true')
    expect(getPersistedApplicationHold('culinary-journey-anna-berg')).toEqual({
      applicationId: 'culinary-journey-anna-berg',
    })

    fireEvent.click(annaHold)
    expect(annaHold).toHaveAttribute('aria-pressed', 'false')
    expect(getPersistedApplicationHold('culinary-journey-anna-berg')).toBeUndefined()
  })
})
