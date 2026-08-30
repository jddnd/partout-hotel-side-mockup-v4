import { createFileRoute } from '@tanstack/react-router'
import { SettingsIndexPage } from '../hotel/settings/settings-index-page'

export const Route = createFileRoute('/hotel/settings/')({
  component: SettingsIndexRoute,
})

function SettingsIndexRoute() {
  return <SettingsIndexPage />
}
