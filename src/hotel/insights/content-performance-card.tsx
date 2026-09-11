import type { ContentFormatInsight } from './insights.types'

export function ContentPerformanceCard({ formats }: Readonly<{ formats: ReadonlyArray<ContentFormatInsight> }>) {
  return (
    <section id="content" className="border-t border-partout-border pt-5" aria-labelledby="content-performance-title">
      <div className="flex items-baseline justify-between gap-3">
        <div>
          <h2 id="content-performance-title" className="font-display text-[22px] font-normal tracking-[-0.02em] text-partout-text">Content behind the result</h2>
          <p className="mt-1 text-[7px] text-partout-text-muted">Measured reach and interactions by format</p>
        </div>
      </div>

      <div className="mt-4 space-y-4">
        {formats.map((format) => (
          <div key={format.format}>
            <div className="grid grid-cols-[58px_minmax(0,1fr)_64px_58px] items-baseline gap-2 text-[7px]">
              <span className="font-medium text-partout-text">{format.format}</span>
              <span className="text-partout-text-muted">{format.published} published</span>
              <span className="text-right text-partout-text-muted">{format.reach} reach</span>
              <span className="text-right font-medium text-partout-text">{format.engagement}</span>
            </div>
            <span className="mt-2 block h-1 rounded-full bg-partout-muted" aria-hidden="true">
              <span className="block h-full rounded-full bg-partout-action" style={{ width: `${format.share}%` }} />
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-end border-t border-partout-border pt-2 text-[6px] text-partout-text-muted">
        <span>Interactions</span>
      </div>
    </section>
  )
}
