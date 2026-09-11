import type { RankedInsight } from './insights.types'

export function RankedInsightsCard({
  title,
  items,
}: Readonly<{
  title: string
  items: ReadonlyArray<RankedInsight>
}>) {
  return (
    <section className="rounded-card border border-partout-border bg-partout-surface p-4 shadow-card">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-[10px] font-medium text-partout-text">{title}</h2>
        <button type="button" className="text-[7px] text-partout-text-muted transition-colors hover:text-partout-text">View all</button>
      </div>

      <div className="mt-2 divide-y divide-partout-border">
        {items.map((item, index) => (
          <article key={item.label} className="grid grid-cols-[18px_minmax(0,1fr)_auto] items-center gap-2 py-2.5 first:pt-1.5">
            <span className="text-[8px] font-medium text-partout-text-muted">{index + 1}</span>
            <div className="min-w-0">
              <p className="truncate text-[8px] font-medium text-partout-text">{item.label}</p>
              <p className="mt-0.5 truncate text-[6px] text-partout-text-muted">{item.meta}</p>
            </div>
            <p className="whitespace-nowrap text-[7px] font-medium text-partout-text">{item.value}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
