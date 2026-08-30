import { createFileRoute } from '@tanstack/react-router'
import { GallerySettingsPage } from '../hotel/settings/gallery-settings-page'

export const Route = createFileRoute('/hotel/settings/gallery')({
  component: GallerySettingsRoute,
})

function GallerySettingsRoute() {
  return <GallerySettingsPage />
}
