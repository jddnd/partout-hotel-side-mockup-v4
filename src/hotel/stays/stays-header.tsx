import { CalendarDays, Search } from 'lucide-react'

export function StaysHeader() {
  return (
    <header className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="font-display text-[32px] font-normal leading-none tracking-[-0.03em] text-partout-text">Stays</h1>
        <p className="mt-2 text-[9px] text-partout-text-muted">Current and upcoming creator stays</p>
      </div>

      <div className="flex items-center gap-2">
        <label className="flex h-8 w-[184px] items-center gap-2 rounded-control border border-partout-border bg-partout-surface px-3 text-partout-text-muted">
          <Search aria-hidden="true" size={11} strokeWidth={1.7} />
          <input aria-label="Search stays" placeholder="Search stays" className="min-w-0 flex-1 bg-transparent text-[8px] text-partout-text outline-none placeholder:text-partout-text-muted" />
        </label>
        <button type="button" className="flex h-8 items-center gap-2 rounded-control border border-partout-border bg-partout-surface px-3 text-[8px] text-partout-text transition-colors hover:bg-partout-muted">
          <CalendarDays aria-hidden="true" size={11} strokeWidth={1.6} />
          May 14 – May 20
        </button>
      </div>
    </header>
  )
}
