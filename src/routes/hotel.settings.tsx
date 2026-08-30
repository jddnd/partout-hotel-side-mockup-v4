import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/hotel/settings')({
  component: SettingsRoute,
})

function SettingsRoute() {
  return <Outlet />
}
