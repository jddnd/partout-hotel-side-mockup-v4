import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import { createMemoryHistory, createRouter, RouterProvider } from '@tanstack/react-router'
import { describe, expect, it } from 'vitest'
import { routeTree } from '../../routeTree.gen'

describe('CampaignsPage', () => {
  it('renders the owner-reference campaigns table', async () => {
    const router = createRouter({
      routeTree,
      history: createMemoryHistory({ initialEntries: ['/hotel/campaigns'] }),
    })

    await router.load()
    render(<RouterProvider router={router} />)

    expect(await screen.findByRole('heading', { name: 'Campaigns' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Create campaign/ })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /Active/ })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('link', { name: 'Coastal Escape' })).toBeInTheDocument()
    expect(screen.getByText('Family Getaway')).toBeInTheDocument()
    expect(screen.getAllByRole('row')).toHaveLength(6)
    expect(screen.getByText('Showing 1–5 of 5 campaigns')).toBeInTheDocument()
  })
})
