import { ArrowUpRight } from 'lucide-react'
import type { InsightObservation } from './insights.types'

export function InsightObservations({ observations }: Readonly<{ observations: ReadonlyArray<InsightObservation> }>) {
  const observation = observations[0]

  if (!observation) return null

  return (
    <section className="rounded-card bg-partout-canvas px-5 py-5" aria-labelledby="so-what-title">
      <p className="text-[7px] font-medium uppercase tracking-[0.16em] text-partout-text-muted">{observation.eyebrow}</p>
      <h2 id="so-what-title" className="mt-2 max-w-[620px] font-display text-[24px] font-normal leading-[1.15] tracking-[-0.025em] text-partout-text">
        {observation.title}
      </h2>
      <p className="mt-3 max-w-[680px] text-[8px] leading-4 text-partout-text-muted">{observation.detail}</p>
      <a href={observation.href} className="mt-4 inline-flex items-center gap-1 text-[8px] font-medium text-partout-action transition-colors hover:text-partout-action-hover">
        {observation.actionLabel}
        <ArrowUpRight aria-hidden="true" size={10} strokeWidth={1.7} />
      </a>
    </section>
  )
}
