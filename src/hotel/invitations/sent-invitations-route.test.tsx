import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { createMemoryHistory, createRouter, RouterProvider } from '@tanstack/react-router'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import type { HotelCampaignInvitation } from '../../entities/campaign-invitation/campaign-invitation.types'
import { routeTree } from '../../routeTree.gen'
import { saveMockCampaignInvitation } from './campaign-invitation-storage'

beforeEach(() => window.localStorage.clear())
afterEach(() => cleanup())

async function renderCampaign(path: string) {
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: [path] }),
  })

  await router.load()
  render(<RouterProvider router={router} />)
}

describe('sent invitations campaign route', () => {
  it('keeps the existing campaign route unchanged when there are no invitations', async () => {
    await renderCampaign('/hotel/campaigns/coastal-escape')

    expect(await screen.findByRole('heading', { name: 'Coastal Escape' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Sent invitations' })).not.toBeInTheDocument()
  })

  it('shows sent invitations on the matching campaign only', async () => {
    const invitation: HotelCampaignInvitation = {
      id: 'invitation-route-daniel-coastal',
      creatorId: 'daniel-kahn',
      campaignId: 'coastal-escape',
      status: 'PENDING',
      createdAt: '2026-09-13T20:00:00.000Z',
      respondBy: null,
    }
    expect(saveMockCampaignInvitation(invitation)).toBe(true)

    await renderCampaign('/hotel/campaigns/coastal-escape')

    expect(await screen.findByRole('heading', { name: 'Sent invitations' })).toBeInTheDocument()
    expect(screen.getByText('Daniel Kahn')).toBeInTheDocument()
  })
})
