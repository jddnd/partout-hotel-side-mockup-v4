import { Outlet, createFileRoute } from '@tanstack/react-router'
import { HotelShell } from '../hotel/shell/hotel-shell'

export const Route = createFileRoute('/hotel')({
  component: HotelLayout,
})

function HotelLayout() {
  return (
    <HotelShell>
      <Outlet />
    </HotelShell>
  )
}
