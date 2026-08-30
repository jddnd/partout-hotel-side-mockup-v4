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
    <aside className="hidden min-h-screen bg-partout-forest text-white lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:px-3 lg:py-5">
      <div className="px-2 font-display text-lg tracking-[-0.02em]">partout</div>

      <button
        type="button"
        className="mt-4 flex h-9 w-full items-center justify-between rounded-control border border-white/10 bg-white/[0.04] px-3 text-left text-[11px] text-white/80 hover:bg-white/[0.08]"
      >
        <span className="truncate">Marienlyst, Helsingør</span>
        <span aria-hidden="true">⌄</span>
      </button>

      <nav aria-label="Hotel workspace" className="mt-5 space-y-1">
        {navItems.map(({ label, to, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            activeOptions={{ exact: to === '/hotel' }}
            className="flex h-9 items-center gap-3 rounded-control px-3 text-xs text-white/72 transition-colors hover:bg-white/[0.07] hover:text-white"
            activeProps={{ className: 'bg-white/10 text-white' }}
          >
            <Icon aria-hidden="true" size={15} strokeWidth={1.7} />
            <span>{label}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-auto rounded-card border border-white/10 bg-white/[0.04] p-2">
        <div className="aspect-[4/3] rounded-[6px] bg-[linear-gradient(135deg,#a9b7a7,#d9d0bd_48%,#8d9a8a)]" role="img" aria-label="Marienlyst hotel placeholder" />
        <div className="px-1 pb-1 pt-3">
          <div className="text-xs font-medium">Marienlyst, Helsingør</div>
          <button type="button" className="mt-1 text-[10px] text-white/65 hover:text-white">
            View profile <span aria-hidden="true">›</span>
          </button>
        </div>
      </div>
    </aside>
  )
}
