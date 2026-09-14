import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { TodayPage } from './today-page'

describe('TodayPage', () => {
  it('renders the operational overview and primary actions', () => {
    render(<TodayPage />)

    expect(screen.getByRole('heading', { name: 'Today' })).toBeInTheDocument()
    expect(screen.getByText('Pending applications')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Create campaign' })).toHaveAttribute('href', '/hotel/campaigns/new')
    expect(screen.getByRole('button', { name: /View all tasks/ })).toBeInTheDocument()
    expect(screen.getByText('Stay timeline')).toBeInTheDocument()
    expect(screen.getAllByRole('img', { name: 'Sofie Larsen' })).toHaveLength(2)
  })

  it('routes only the safe Needs action rows to existing Hotel surfaces', () => {
    render(<TodayPage />)

    expect(screen.getByRole('link', { name: /Applications need review/ })).toHaveAttribute(
      'href',
      '/hotel/applications',
    )
    expect(screen.getByRole('link', { name: /Stays check-in today/ })).toHaveAttribute('href', '/hotel/stays')
    expect(screen.getByRole('link', { name: /Underperforming campaign/ })).toHaveAttribute(
      'href',
      '/hotel/insights?view=campaigns',
    )

    expect(screen.getByRole('button', { name: /Campaign deliverable due/ })).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /Campaign deliverable due/ })).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: /View all tasks/ })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Assign room' })).toBeInTheDocument()
  })
})
