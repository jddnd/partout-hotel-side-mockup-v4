import '@testing-library/jest-dom/vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { createMemoryHistory, createRouter, RouterProvider } from '@tanstack/react-router'
import { describe, expect, it } from 'vitest'
import { routeTree } from '../../routeTree.gen'

describe('CampaignsPage', () => {
  it('renders the owner-reference campaigns table and opens campaign creation', async () => {
    const router = createRouter({
      routeTree,
      history: createMemoryHistory({ initialEntries: ['/hotel/campaigns'] }),
    })

    await router.load()
    render(<RouterProvider router={router} />)

    expect(await screen.findByRole('heading', { name: 'Campaigns' })).toBeInTheDocument()
    const createButton = screen.getByRole('button', { name: /Create campaign/ })
    expect(createButton).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /Active/ })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('link', { name: 'Coastal Escape' })).toBeInTheDocument()
    expect(screen.getByText('Family Getaway')).toBeInTheDocument()
    expect(screen.getAllByRole('row')).toHaveLength(6)
    expect(screen.getByText('Showing 1–5 of 5 campaigns')).toBeInTheDocument()

    fireEvent.click(createButton)

    expect(screen.getByRole('dialog', { name: 'New campaign' })).toBeInTheDocument()
    expect(screen.getByText('Basics')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Continue' })).toBeDisabled()

    fireEvent.change(screen.getByPlaceholderText('Coastal Autumn'), { target: { value: 'Autumn Coast' } })
    expect(screen.getByRole('button', { name: 'Continue' })).toBeEnabled()
  })
})
