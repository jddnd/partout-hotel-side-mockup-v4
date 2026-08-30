import { ArrowUpRight } from 'lucide-react'
import type { InsightObservation } from './insights.types'

export function InsightObservations({ observations }: Readonly<{ observations: ReadonlyArray<InsightObservation> }>) {
  return (
    <section className="rounded-card border border-partout-border bg-partout-surface p-4 shadow-card" aria-labelledby="so-what-title">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 id="so-what-title" className="font-display text-[19px] font-normal leading-none text-partout-text">So what?</h2>
          <p className="mt-1 text-[7px] text-partout-text-muted">What stands out this period</p>
        </div>
        <span className="rounded-full bg-partout-success-soft px-2 py-1 text-[6px] font-medium text-partout-success-text">3 signals</span>
      </div>

      <div className="mt-3 divide-y divide-partout-border">
        {observations.map((observation) => (
          <article key={observation.title} className="grid grid-cols-[14px_minmax(0,1fr)] gap-2 py-2.5 first:pt-1.5">
            <ArrowUpRight aria-hidden="true" size={11} strokeWidth={1.7} className="mt-0.5 text-partout-action" />
            <div>
              <p className="text-[8px] font-medium text-partout-text">{observation.title}</p>
              <p className="mt-1 text-[7px] leading-3 text-partout-text-muted">{observation.detail}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
