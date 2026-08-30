import { Bell, Search } from 'lucide-react'

export function PageHeader({ title, subtitle }: Readonly<{ title: string; subtitle?: string }>) {
  return (
    <header className="flex items-start justify-between gap-6">
      <div>
        <h1 className="font-display text-[30px] font-normal leading-none tracking-[-0.025em] text-partout-text">{title}</h1>
        {subtitle ? <p className="mt-2 text-[11px] text-partout-text-muted">{subtitle}</p> : null}
      </div>

      <div className="flex items-center gap-2">
        <button type="button" aria-label="Search" className="grid size-9 place-items-center rounded-control text-partout-text-muted hover:bg-partout-muted hover:text-partout-text">
          <Search size={16} strokeWidth={1.7} />
        </button>
        <button type="button" aria-label="Notifications" className="grid size-9 place-items-center rounded-control text-partout-text-muted hover:bg-partout-muted hover:text-partout-text">
          <Bell size={16} strokeWidth={1.7} />
        </button>
        <div className="grid size-8 place-items-center rounded-full bg-partout-forest text-[10px] font-semibold text-white" aria-label="Signed in user">
          MH
        </div>
      </div>
    </header>
  )
}
