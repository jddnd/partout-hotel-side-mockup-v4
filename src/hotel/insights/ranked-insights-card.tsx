import { ChevronRight } from 'lucide-react'
import type { ContributionInsight } from './insights.types'

export function RankedInsightsCard({
  title,
  items,
  id,
}: Readonly<{
  title: string
  items: ReadonlyArray<ContributionInsight>
  id?: string
}>) {
  return (
    <section id={id} className="border-t border-partout-border pt-5" aria-labelledby={id ? `${id}-title` : undefined}>
      <div className="flex items-baseline justify-between gap-3">
        <h2 id={id ? `${id}-title` : undefined} className="font-display text-[22px] font-normal tracking-[-0.02em] text-partout-text">{title}</h2>
        <p className="text-[7px] text-partout-text-muted">Contribution, not a ranking</p>
      </div>

      <div className="mt-3 divide-y divide-partout-border border-y border-partout-border">
        {items.map((item) => (
          <a key={item.id} href={item.href} className="grid grid-cols-[minmax(0,1fr)_auto_14px] items-center gap-3 py-3 transition-colors hover:bg-partout-canvas/60">
            <div className="min-w-0">
              <p className="truncate text-[9px] font-medium text-partout-text">{item.label}</p>
              <p className="mt-1 truncate text-[7px] text-partout-text-muted">{item.meta}</p>
            </div>
            <p className="whitespace-nowrap text-[8px] font-medium text-partout-text">{item.value}</p>
            <ChevronRight aria-hidden="true" size={11} strokeWidth={1.6} className="text-partout-text-muted" />
          </a>
        ))}
      </div>
    </section>
  )
}
