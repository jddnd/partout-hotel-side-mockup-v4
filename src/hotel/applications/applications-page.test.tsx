import '@testing-library/jest-dom/vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { getPersistedApplicationApproval } from './application-approval-action'
import { ApplicationsPage } from './applications-page'

describe('ApplicationsPage', () => {
  beforeEach(() => window.localStorage.clear())

  it('renders the decision queue and shortlist', () => {
    render(<ApplicationsPage />)

    expect(screen.getByRole('heading', { name: 'Applications' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /All applications/ })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('heading', { name: 'Sofie Larsen' })).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: 'Accept' })).toHaveLength(3)
    expect(screen.getByRole('heading', { name: 'Shortlist (3)' })).toBeInTheDocument()
  })

  it('routes Accept through the shared application approval workflow', () => {
    render(<ApplicationsPage />)

    fireEvent.click(screen.getAllByRole('button', { name: 'Accept' })[0])

    expect(getPersistedApplicationApproval('coastal-escape-sofie-larsen')?.collaboration.id).toBe(
      'collaboration-coastal-escape-sofie-larsen',
    )
  })
})
