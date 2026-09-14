import { render, screen } from '@testing-library/react'
import { createMemoryHistory, createRootRoute, createRoute, createRouter, RouterProvider } from '@tanstack/react-router'
import { describe, expect, it } from 'vitest'
import { HotelSidebar } from './hotel-sidebar'

function renderSidebar() {
  const rootRoute = createRootRoute({ component: HotelSidebar })
  const profileRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/hotel/settings/profile',
    component: () => null,
  })
  const routeTree = rootRoute.addChildren([profileRoute])
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: ['/'] }),
  })

  return render(<RouterProvider router={router} />)
}

describe('HotelSidebar', () => {
  it('routes the existing View profile action to the existing Hotel profile route', async () => {
    renderSidebar()

    const link = await screen.findByRole('link', { name: /view profile/i })
    expect(link).toHaveAttribute('href', '/hotel/settings/profile')
  })
})
