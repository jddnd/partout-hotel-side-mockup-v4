import { createFileRoute } from '@tanstack/react-router'
import { CampaignCreateDrawer } from '../hotel/campaigns/campaign-create-drawer'
import { CampaignsPage } from '../hotel/campaigns/campaigns-page'

export const Route = createFileRoute('/hotel/campaigns_/new')({
  component: CampaignCreateRoute,
})

function CampaignCreateRoute() {
  return (
    <>
      <CampaignsPage />
      <CampaignCreateDrawer onClose={() => window.location.assign('/hotel/campaigns')} />
    </>
  )
}
