import { createFileRoute } from '@tanstack/react-router'
import { ProfileSettingsPage } from '../hotel/settings/profile-settings-page'

export const Route = createFileRoute('/hotel/settings/profile')({
  component: ProfileSettingsRoute,
})

function ProfileSettingsRoute() {
  return <ProfileSettingsPage />
}
