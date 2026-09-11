import type { InsightMetric } from './insights.types'

export function InsightMetrics({ metrics }: Readonly<{ metrics: ReadonlyArray<InsightMetric> }>) {
  return (
    <section id="overview" className="mt-6 border-y border-partout-border" aria-label="Measured outcomes">
      <div className="grid sm:grid-cols-3">
        {metrics.map((metric, index) => (
          <article
            key={metric.label}
            className={`py-6 sm:px-5 ${index > 0 ? 'border-t border-partout-border sm:border-l sm:border-t-0' : ''}`}
          >
            <p className="text-[7px] font-medium uppercase tracking-[0.14em] text-partout-text-muted">{metric.label}</p>
            <p className="mt-3 font-display text-[32px] font-normal leading-none tracking-[-0.035em] text-partout-text">{metric.value}</p>
            <p className="mt-2 text-[7px] leading-4 text-partout-text-muted">{metric.note}</p>
          </article>
        ))}
      </div>
      <p className="border-t border-partout-border py-3 text-[7px] leading-4 text-partout-text-muted">
        Synced metrics are shown when Partout has platform or tracking evidence. Missing measurement should remain unknown rather than being presented as zero.
      </p>
    </section>
  )
}
