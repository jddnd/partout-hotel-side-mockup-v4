import { ArrowUpRight } from 'lucide-react'
import type { InsightMetric } from './insights.types'

export function InsightMetrics({ metrics }: Readonly<{ metrics: ReadonlyArray<InsightMetric> }>) {
  return (
    <section className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6" aria-label="Insight summary metrics">
      {metrics.map((metric) => (
        <article key={metric.label} className="rounded-card border border-partout-border bg-partout-surface px-3 py-3 shadow-card">
          <p className="min-h-5 text-[7px] leading-3 text-partout-text-muted">{metric.label}</p>
          <p className="mt-1 text-[16px] font-medium leading-none tracking-[-0.02em] text-partout-text">{metric.value}</p>
          <p className="mt-2 flex items-center gap-1 text-[7px] font-medium text-partout-success-text">
            <ArrowUpRight aria-hidden="true" size={9} strokeWidth={1.7} />
            {metric.delta}
            <span className="font-normal text-partout-text-muted">vs previous</span>
          </p>
        </article>
      ))}
    </section>
  )
}
