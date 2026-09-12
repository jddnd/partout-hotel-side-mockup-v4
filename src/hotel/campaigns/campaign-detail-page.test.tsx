import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { createMemoryHistory, createRouter, RouterProvider } from '@tanstack/react-router'
import { afterEach, describe, expect, it } from 'vitest'
import { routeTree } from '../../routeTree.gen'

afterEach(() => cleanup())

async function renderCampaign(path: string) {
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: [path] }),
  })

  await router.load()
  render(<RouterProvider router={router} />)
}

describe('CampaignDetailPage message handoff', () => {
  it('opens confirmed creators in their existing conversations', async () => {
    await renderCampaign('/hotel/campaigns/coastal-escape')

    const messageLinks = await screen.findAllByRole('link', { name: 'Message' })
    expect(messageLinks.map((link) => link.getAttribute('href'))).toEqual([
      '/hotel/messages?creator=clara-moreau',
      '/hotel/messages?creator=ida-moller',
      '/hotel/messages?creator=anna-berg',
      '/hotel/messages?creator=sofie-larsen',
    ])
  })

  it('keeps the generic Messages fallback when no conversation exists', async () => {
    await renderCampaign('/hotel/campaigns/summer-wellness')

    const messageLinks = await screen.findAllByRole('link', { name: 'Message' })
    expect(messageLinks.map((link) => link.getAttribute('href'))).toEqual([
      '/hotel/messages?creator=sofie-larsen',
      '/hotel/messages?creator=ida-moller',
      '/hotel/messages',
    ])
  })
})
