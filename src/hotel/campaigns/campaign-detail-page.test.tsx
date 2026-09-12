import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { createMemoryHistory, createRouter, RouterProvider } from '@tanstack/react-router'
import { afterEach, describe, expect, it } from 'vitest'
import { campaigns } from '../../data/mock/campaigns'
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

describe('CampaignDetailPage handoffs', () => {
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

  it('opens View insights directly on the Campaigns insights section', async () => {
    await renderCampaign('/hotel/campaigns/coastal-escape')

    const insightLinks = await screen.findAllByRole('link', { name: 'View insights' })
    expect(insightLinks).toHaveLength(2)
    for (const link of insightLinks) {
      expect(link).toHaveAttribute('href', '/hotel/insights?view=campaigns')
    }
  })

  it.each(campaigns.map((campaign) => [campaign.id, campaign.name]))(
    'renders campaign detail for %s from the campaign collection',
    async (campaignId, campaignName) => {
      await renderCampaign(`/hotel/campaigns/${campaignId}`)

      expect(await screen.findByRole('heading', { name: campaignName })).toBeInTheDocument()
      expect(screen.queryByText('Campaign not found')).not.toBeInTheDocument()
    },
  )

  it('uses base campaign facts when richer detail data is unavailable', async () => {
    await renderCampaign('/hotel/campaigns/family-getaway')

    expect(await screen.findByRole('heading', { name: 'Family Getaway' })).toBeInTheDocument()
    expect(screen.getByText('2 Reels · 4 Stories · 1 Posts')).toBeInTheDocument()
    expect(screen.getByText('2 campaign talent')).toBeInTheDocument()
    expect(screen.getAllByText(/Not modeled/i).length).toBeGreaterThanOrEqual(4)
  })

  it('keeps the not-found state for campaign ids that do not exist', async () => {
    await renderCampaign('/hotel/campaigns/not-a-real-campaign')

    expect(await screen.findByText('Campaign not found')).toBeInTheDocument()
  })
})