import type { ContentFormatInsight } from './insights.types'

export function ContentPerformanceCard({ formats }: Readonly<{ formats: ReadonlyArray<ContentFormatInsight> }>) {
  return (
    <section className="rounded-card border border-partout-border bg-partout-surface p-4 shadow-card" aria-labelledby="content-performance-title">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 id="content-performance-title" className="text-[10px] font-medium text-partout-text">Content performance</h2>
          <p className="mt-1 text-[7px] text-partout-text-muted">Reach and engagement by format</p>
        </div>
        <button type="button" className="text-[7px] font-medium text-partout-action hover:text-partout-action-hover">View content</button>
      </div>

      <div className="mt-3 space-y-3">
        {formats.map((format) => (
          <div key={format.format} className="grid grid-cols-[48px_minmax(0,1fr)_54px_48px] items-center gap-2 text-[7px]">
            <span className="font-medium text-partout-text">{format.format}</span>
            <span className="h-1.5 rounded-full bg-partout-muted" aria-hidden="true">
              <span className="block h-full rounded-full bg-partout-action" style={{ width: `${format.share}%` }} />
            </span>
            <span className="text-right text-partout-text-muted">{format.reach}</span>
            <span className="text-right font-medium text-partout-text">{format.engagement}</span>
          </div>
        ))}
      </div>

      <div className="mt-3 grid grid-cols-[48px_minmax(0,1fr)_54px_48px] gap-2 border-t border-partout-border pt-2 text-[6px] text-partout-text-muted">
        <span>Format</span><span>Relative reach</span><span className="text-right">Reach</span><span className="text-right">Eng.</span>
      </div>
    </section>
  )
}
