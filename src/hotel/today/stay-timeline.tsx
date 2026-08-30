import type { StayTimelineItem } from './today.types'

const days = ['Mon 12', 'Tue 13', 'Wed 14', 'Thu 15', 'Fri 16', 'Sat 17', 'Sun 18']

export function StayTimeline({ items }: Readonly<{ items: StayTimelineItem[] }>) {
  return (
    <section className="rounded-card border border-partout-border bg-partout-surface p-4 shadow-card">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xs font-semibold">Stay timeline</h2>
        <span className="text-[9px] text-partout-text-muted">May 12 – May 18, 2025</span>
      </div>

      <div className="mt-4 grid grid-cols-[88px_minmax(0,1fr)] gap-x-3">
        <div />
        <div className="grid grid-cols-7 text-center text-[8px] text-partout-text-muted">
          {days.map((day) => <span key={day}>{day}</span>)}
        </div>

        {items.map((item) => (
          <div key={item.name} className="contents">
            <div className="flex h-10 items-center gap-2 border-b border-partout-border/70">
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-partout-muted text-[8px] font-semibold text-partout-text-muted">{item.initials}</span>
              <span className="truncate text-[9px] font-medium">{item.name}</span>
            </div>
            <div className="relative h-10 border-b border-partout-border/70 bg-[linear-gradient(to_right,transparent_calc(14.285%-1px),#eceeea_14.285%,transparent_calc(14.285%+1px))] bg-[length:14.285%_100%]">
              <div className="absolute left-[28.57%] top-0 h-full w-px bg-[#b78972]/70" aria-hidden="true" />
              <div
                className={item.state === 'confirmed' ? 'absolute top-[17px] h-1.5 rounded-full bg-partout-action' : 'absolute top-[17px] h-1.5 rounded-full bg-[#c8cdc7]'}
                style={{ left: `${item.startPercent}%`, width: `${item.widthPercent}%` }}
                aria-label={`${item.name} ${item.state} stay period`}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 flex justify-end gap-4 text-[8px] text-partout-text-muted">
        <span className="flex items-center gap-1.5"><span className="h-1.5 w-4 rounded-full bg-partout-action" />Confirmed</span>
        <span className="flex items-center gap-1.5"><span className="h-1.5 w-4 rounded-full bg-[#c8cdc7]" />Upcoming</span>
      </div>
    </section>
  )
}
