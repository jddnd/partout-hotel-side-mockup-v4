import { createFileRoute } from '@tanstack/react-router'
import { HotelPlaceholderPage } from '../hotel/shell/hotel-placeholder-page'

export const Route = createFileRoute('/hotel/applications')({
  component: ApplicationsRoute,
})

function ApplicationsRoute() {
  return <HotelPlaceholderPage title="Applications" />
}
