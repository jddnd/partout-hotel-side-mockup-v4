import { createFileRoute } from '@tanstack/react-router'
import { HotelPlaceholderPage } from '../hotel/shell/hotel-placeholder-page'

export const Route = createFileRoute('/hotel/messages')({
  component: MessagesRoute,
})

function MessagesRoute() {
  return <HotelPlaceholderPage title="Messages" />
}
