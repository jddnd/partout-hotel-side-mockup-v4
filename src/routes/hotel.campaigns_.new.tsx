import { createFileRoute } from '@tanstack/react-router'
import { CampaignCreatePage } from '../hotel/campaigns/campaign-create-page'

export const Route = createFileRoute('/hotel/campaigns_/new')({
  component: CampaignCreatePage,
})
