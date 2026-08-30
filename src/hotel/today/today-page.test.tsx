import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { TodayPage } from './today-page'

describe('TodayPage', () => {
  it('renders the operational overview and primary actions', () => {
    render(<TodayPage />)

    expect(screen.getByRole('heading', { name: 'Today' })).toBeInTheDocument()
    expect(screen.getByText('Pending applications')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Create campaign' })).toBeInTheDocument()
    expect(screen.getByText('Stay timeline')).toBeInTheDocument()
  })
})
