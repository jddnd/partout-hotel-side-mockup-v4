import { createFileRoute } from '@tanstack/react-router'
import { AccountSettingsPage } from '../hotel/settings/account-settings-page'

export const Route = createFileRoute('/hotel/settings/account')({
  component: AccountSettingsRoute,
})

function AccountSettingsRoute() {
  return <AccountSettingsPage />
}
