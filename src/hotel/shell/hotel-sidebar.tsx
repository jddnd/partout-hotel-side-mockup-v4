import { Link } from '@tanstack/react-router'
import {
  BarChart3,
  CalendarDays,
  Home,
  MessageSquare,
  Settings,
  Sparkles,
  Users,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const navItems = [
  { label: 'Today', to: '/hotel', icon: Home },
  { label: 'Applications', to: '/hotel/applications', icon: Users },
  { label: 'Campaigns', to: '/hotel/campaigns', icon: Sparkles },
  { label: 'Stays', to: '/hotel/stays', icon: CalendarDays },
  { label: 'Messages', to: '/hotel/messages', icon: MessageSquare },
  { label: 'Insights', to: '/hotel/insights', icon: BarChart3 },
  { label: 'Settings', to: '/hotel/settings', icon: Settings },
] as const satisfies ReadonlyArray<{ label: string; to: string; icon: LucideIcon }>

export function HotelSidebar() {
  return (
    <aside className="hidden min-h-screen bg-partout-forest text-white lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:px-4 lg:py-6">
      <div className="px-1 text-[17px] font-medium leading-none tracking-[-0.025em]">partout</div>

      <button
        type="button"
        className="mt-7 flex h-10 w-full items-center justify-between rounded-control border border-white/10 bg-white/[0.035] px-3 text-left text-[10px] font-medium text-white/86 transition-colors hover:bg-white/[0.07]"
      >
        <span className="truncate">Marienlyst, Helsingør</span>
        <span className="text-white/60" aria-hidden="true">⌄</span>
      </button>

      <nav aria-label="Hotel workspace" className="mt-6 space-y-1.5">
        {navItems.map(({ label, to, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            activeOptions={{ exact: to === '/hotel' }}
            className="flex h-10 items-center gap-3 rounded-control px-3 text-[11px] font-medium text-white/74 transition-colors hover:bg-white/[0.07] hover:text-white"
            activeProps={{ className: 'bg-white/[0.13] text-white' }}
          >
            <Icon aria-hidden="true" size={15} strokeWidth={1.8} />
            <span>{label}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-auto px-1 pb-10">
        <div className="hotel-cover-placeholder aspect-[8/5] rounded-card border border-white/10" role="img" aria-label="Marienlyst hotel placeholder" />
        <div className="pt-3">
          <div className="text-[11px] font-medium">Marienlyst, Helsingør</div>
          <button type="button" className="mt-1.5 text-[10px] text-white/68 transition-colors hover:text-white">
            View profile <span aria-hidden="true">›</span>
          </button>
        </div>
      </div>
    </aside>
  )
}
