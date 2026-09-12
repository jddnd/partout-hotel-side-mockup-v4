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

  it('renders Heritage & History from existing campaign facts without inventing confirmation state', async () => {
    await renderCampaign('/hotel/campaigns/heritage-history')

    expect(await screen.findByRole('heading', { name: 'Heritage & History' })).toBeInTheDocument()
    expect(screen.queryByText('Campaign not found')).not.toBeInTheDocument()
    expect(screen.getByText('3 Reels · 5 Stories · 4 Posts')).toBeInTheDocument()
    expect(screen.getByText('3 campaign talent')).toBeInTheDocument()
    expect(screen.queryByText('3 confirmed')).not.toBeInTheDocument()
    expect(screen.getByText('Clara Moreau')).toBeInTheDocument()
    expect(screen.getByText('Anna Berg')).toBeInTheDocument()
    expect(screen.getByText('Maya Holm')).toBeInTheDocument()
    expect(screen.getAllByText(/Not modeled/i).length).toBeGreaterThanOrEqual(4)
  })

  it('renders Culinary Journey from existing campaign facts without inventing detail data', async () => {
    await renderCampaign('/hotel/campaigns/culinary-journey')

    expect(await screen.findByRole('heading', { name: 'Culinary Journey' })).toBeInTheDocument()
    expect(screen.queryByText('Campaign not found')).not.toBeInTheDocument()
    expect(screen.getByText('4 Reels · 8 Stories · 2 Posts')).toBeInTheDocument()
    expect(screen.getByText('3 campaign talent')).toBeInTheDocument()
    expect(screen.getByText('Sofie Larsen')).toBeInTheDocument()
    expect(screen.getByText('Ida Møller')).toBeInTheDocument()
    expect(screen.getByText('Anna Berg')).toBeInTheDocument()
    expect(screen.getAllByText(/Not modeled/i).length).toBeGreaterThanOrEqual(4)
  })

  it('renders Family Getaway from existing campaign facts without inventing detail data', async () => {
    await renderCampaign('/hotel/campaigns/family-getaway')

    expect(await screen.findByRole('heading', { name: 'Family Getaway' })).toBeInTheDocument()
    expect(screen.queryByText('Campaign not found')).not.toBeInTheDocument()
    expect(screen.getByText('2 Reels · 4 Stories · 1 Posts')).toBeInTheDocument()
    expect(screen.getByText('2 campaign talent')).toBeInTheDocument()
    expect(screen.getByText('Maya Holm')).toBeInTheDocument()
    expect(screen.getByText('Anna Berg')).toBeInTheDocument()
    expect(screen.getAllByText(/Not modeled/i).length).toBeGreaterThanOrEqual(4)
  })
})
