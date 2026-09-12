import { createFileRoute } from '@tanstack/react-router'
import { CampaignsPage } from '../hotel/campaigns/campaigns-page'

export const Route = createFileRoute('/hotel/campaigns')({
  component: CampaignsPage,
})
