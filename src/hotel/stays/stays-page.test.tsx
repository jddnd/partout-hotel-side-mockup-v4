import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { StaysPage } from './stays-page'

describe('StaysPage', () => {
  it('renders a hotel-scoped creator stay operations surface', () => {
    render(<StaysPage />)

    expect(screen.getByRole('heading', { name: 'Stays' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /Active/ })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText('Sofie Larsen')).toBeInTheDocument()
    expect(screen.getByText('Sea View 214')).toBeInTheDocument()
    expect(screen.getByText('3 of 4 published')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'View profile' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Message/ })).toHaveAttribute('href', '/hotel/messages')
  })
})
