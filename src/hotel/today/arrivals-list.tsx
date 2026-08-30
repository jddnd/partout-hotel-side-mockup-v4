import type { Arrival } from './today.types'

export function ArrivalsList({ arrivals }: Readonly<{ arrivals: Arrival[] }>) {
  return (
    <section className="rounded-card border border-partout-border bg-partout-surface p-4 shadow-card">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xs font-semibold">Arrivals this week</h2>
        <button type="button" className="text-[10px] text-partout-text-muted hover:text-partout-action">View all arrivals</button>
      </div>
      <ul className="mt-3 divide-y divide-partout-border">
        {arrivals.map((arrival) => (
          <li key={arrival.name} className="grid min-h-11 grid-cols-[28px_minmax(0,1fr)_auto] items-center gap-2 py-2">
            <div className="grid size-7 place-items-center rounded-full bg-partout-muted text-[9px] font-semibold text-partout-text-muted">{arrival.initials}</div>
            <div className="min-w-0">
              <p className="truncate text-[11px] font-medium">{arrival.name}</p>
              <p className="mt-0.5 text-[9px] text-partout-text-muted">{arrival.relative} · {arrival.dates}</p>
            </div>
            <span className="rounded bg-partout-success-soft px-2 py-1 text-[9px] font-medium text-partout-success-text">{arrival.status}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
