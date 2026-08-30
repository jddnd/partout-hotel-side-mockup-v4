import { createFileRoute } from '@tanstack/react-router'
import { HotelPlaceholderPage } from '../hotel/shell/hotel-placeholder-page'

export const Route = createFileRoute('/hotel/settings')({
  component: SettingsRoute,
})

function SettingsRoute() {
  return <HotelPlaceholderPage title="Settings" />
}
