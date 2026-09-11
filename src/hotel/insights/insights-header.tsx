import { Download } from 'lucide-react'

const ranges = ['30 days', '90 days', 'Year', 'All time'] as const

export function InsightsHeader() {
  return (
    <header className="border-b border-partout-border pb-5">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <p className="text-[7px] font-medium uppercase tracking-[0.17em] text-partout-text-muted">Measured collaboration activity</p>
          <h1 className="mt-2 font-display text-[36px] font-normal leading-none tracking-[-0.04em] text-partout-text">Insights</h1>
          <p className="mt-3 max-w-[520px] text-[9px] leading-5 text-partout-text-muted">
            What your creator collaborations published, and what people did with it.
          </p>
        </div>

        <button
          type="button"
          className="flex h-8 items-center gap-1.5 rounded-control border border-partout-border bg-partout-surface px-3 text-[8px] font-medium text-partout-text transition-colors hover:bg-partout-muted"
        >
          <Download aria-hidden="true" size={11} strokeWidth={1.6} />
          Export
        </button>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-1.5" aria-label="Insight range">
        {ranges.map((range, index) => (
          <button
            key={range}
            type="button"
            aria-pressed={index === 0}
            className={`h-7 rounded-control px-2.5 text-[8px] font-medium transition-colors ${
              index === 0
                ? 'bg-partout-action text-white'
                : 'text-partout-text-muted hover:bg-partout-muted hover:text-partout-text'
            }`}
          >
            {range}
          </button>
        ))}
      </div>
    </header>
  )
}
