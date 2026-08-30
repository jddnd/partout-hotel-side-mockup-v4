import { createFileRoute } from '@tanstack/react-router'
import { HotelPlaceholderPage } from '../hotel/shell/hotel-placeholder-page'

export const Route = createFileRoute('/hotel/stays')({
  component: StaysRoute,
})

function StaysRoute() {
  return <HotelPlaceholderPage title="Stays" />
}
