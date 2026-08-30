import { createFileRoute } from '@tanstack/react-router'
import { HotelPlaceholderPage } from '../hotel/shell/hotel-placeholder-page'

export const Route = createFileRoute('/hotel/campaigns')({
  component: CampaignsRoute,
})

function CampaignsRoute() {
  return <HotelPlaceholderPage title="Campaigns" />
}
