import { CalendarDays, ChevronDown, Download } from 'lucide-react'

export function InsightsHeader() {
  return (
    <header className="flex flex-wrap items-start justify-between gap-4">
      <h1 className="font-display text-[32px] font-normal leading-none tracking-[-0.03em] text-partout-text">Insights</h1>

      <div className="flex items-center gap-2">
        <button
          type="button"
          className="flex h-8 items-center gap-2 rounded-control border border-partout-border bg-partout-surface px-3 text-[8px] text-partout-text transition-colors hover:bg-partout-muted"
        >
          <CalendarDays aria-hidden="true" size={11} strokeWidth={1.6} className="text-partout-text-muted" />
          <span>Apr 15 – May 14, 2025</span>
          <ChevronDown aria-hidden="true" size={10} strokeWidth={1.6} className="text-partout-text-muted" />
        </button>

        <button
          type="button"
          className="flex h-8 items-center gap-1.5 rounded-control border border-partout-border bg-partout-surface px-3 text-[8px] font-medium text-partout-text transition-colors hover:bg-partout-muted"
        >
          <Download aria-hidden="true" size={11} strokeWidth={1.6} />
          Export
        </button>
      </div>
    </header>
  )
}
