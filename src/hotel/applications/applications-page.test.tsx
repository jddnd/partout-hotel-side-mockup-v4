import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ApplicationsPage } from './applications-page'

describe('ApplicationsPage', () => {
  it('renders the decision queue and shortlist', () => {
    render(<ApplicationsPage />)

    expect(screen.getByRole('heading', { name: 'Applications' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /All applications/ })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('heading', { name: 'Sofie Larsen' })).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: 'Accept' })).toHaveLength(3)
    expect(screen.getByRole('heading', { name: 'Shortlist (3)' })).toBeInTheDocument()
  })
})
