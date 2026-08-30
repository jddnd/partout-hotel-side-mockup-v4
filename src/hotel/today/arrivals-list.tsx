import { CreatorAvatar } from '../../entities/creator/creator-avatar'
import type { Arrival } from './today.types'

export function ArrivalsList({ arrivals }: Readonly<{ arrivals: Arrival[] }>) {
  return (
    <section className="h-full rounded-card border border-partout-border bg-partout-surface p-4 shadow-card">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-[11px] font-semibold">Arrivals this week</h2>
        <button type="button" className="text-[9px] font-medium text-partout-text-muted transition-colors hover:text-partout-action">View all arrivals</button>
      </div>
      <ul className="mt-3 divide-y divide-partout-border/80">
        {arrivals.map((arrival) => (
          <li key={arrival.name} className="grid min-h-14 grid-cols-[40px_minmax(0,1fr)] items-center gap-x-2 py-1.5 xl:grid-cols-[40px_minmax(86px,1fr)_auto_auto_auto]">
            <CreatorAvatar name={arrival.name} initials={arrival.initials} />
            <div className="min-w-0">
              <p className="truncate text-[10px] font-medium">{arrival.name}</p>
              <p className="mt-0.5 text-[8px] text-partout-text-muted xl:hidden">{arrival.relative} · {arrival.dates}</p>
            </div>
            <span className="hidden whitespace-nowrap text-[8px] text-partout-text-muted xl:block">{arrival.relative}</span>
            <span className="hidden whitespace-nowrap text-[8px] text-partout-text-muted xl:block">{arrival.dates}</span>
            <span className="hidden whitespace-nowrap text-[8px] font-medium text-partout-success-text xl:block">{arrival.status}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
