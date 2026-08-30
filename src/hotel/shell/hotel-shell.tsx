import type { ReactNode } from 'react'
import { HotelSidebar } from './hotel-sidebar'

export function HotelShell({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className="min-h-screen bg-partout-canvas lg:grid lg:grid-cols-[232px_minmax(0,1fr)]">
      <HotelSidebar />
      <main className="min-w-0 px-4 py-5 sm:px-6 lg:px-7 lg:py-6 xl:px-8">{children}</main>
    </div>
  )
}
