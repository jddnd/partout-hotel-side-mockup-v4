import { Bell, Search } from 'lucide-react'

export function PageHeader({ title, subtitle }: Readonly<{ title: string; subtitle?: string }>) {
  return (
    <header className="flex items-start justify-between gap-6">
      <div>
        <h1 className="font-display text-[32px] font-normal leading-none tracking-[-0.03em] text-partout-text">{title}</h1>
        {subtitle ? <p className="mt-2 text-[10px] text-partout-text-muted">{subtitle}</p> : null}
      </div>

      <div className="flex items-center gap-1.5">
        <button type="button" aria-label="Search" className="grid size-8 place-items-center rounded-control text-partout-text-muted transition-colors hover:bg-partout-muted hover:text-partout-text">
          <Search size={15} strokeWidth={1.7} />
        </button>
        <button type="button" aria-label="Notifications" className="grid size-8 place-items-center rounded-control text-partout-text-muted transition-colors hover:bg-partout-muted hover:text-partout-text">
          <Bell size={15} strokeWidth={1.7} />
        </button>
        <div className="staff-avatar size-7 rounded-full border border-partout-border" role="img" aria-label="Signed in hotel user" />
      </div>
    </header>
  )
}
