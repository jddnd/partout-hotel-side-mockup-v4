import { createFileRoute } from '@tanstack/react-router'
import { HotelPlaceholderPage } from '../hotel/shell/hotel-placeholder-page'

export const Route = createFileRoute('/hotel/insights')({
  component: InsightsRoute,
})

function InsightsRoute() {
  return <HotelPlaceholderPage title="Insights" />
}
