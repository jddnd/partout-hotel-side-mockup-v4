import { CreatorAvatar } from '../../entities/creator/creator-avatar'
import type { StayTimelineItem } from './today.types'

const days = ['Mon 12', 'Tue 13', 'Wed 14', 'Thu 15', 'Fri 16', 'Sat 17', 'Sun 18']

export function StayTimeline({ items }: Readonly<{ items: StayTimelineItem[] }>) {
  return (
    <section className="h-full rounded-card border border-partout-border bg-partout-surface p-4 shadow-card">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-[11px] font-semibold">Stay timeline</h2>
        <span className="text-[8px] text-partout-text-muted">May 12 – May 26, 2025</span>
      </div>

      <div className="mt-4 grid grid-cols-[112px_minmax(0,1fr)] gap-x-3">
        <div />
        <div className="grid grid-cols-7 text-center text-[7px] font-medium text-partout-text-muted">
          {days.map((day) => <span key={day}>{day}</span>)}
        </div>

        {items.map((item) => (
          <div key={item.name} className="contents">
            <div className="flex h-14 items-center gap-2 border-b border-partout-border/70">
              <CreatorAvatar name={item.name} initials={item.initials} size="small" />
              <span className="truncate text-[8px] font-medium">{item.name}</span>
            </div>
            <div className="relative h-14 border-b border-partout-border/70 bg-[linear-gradient(to_right,transparent_calc(14.285%-1px),#eceeea_14.285%,transparent_calc(14.285%+1px))] bg-[length:14.285%_100%]">
              <div className="absolute inset-x-1 top-[26px] h-1.5 rounded-full bg-partout-timeline" aria-hidden="true" />
              <div className="absolute left-[28.57%] top-0 h-full w-px bg-partout-today/75" aria-hidden="true" />
              <div
                className={item.state === 'confirmed' ? 'absolute top-[26px] h-1.5 rounded-full bg-partout-action' : 'absolute top-[26px] h-1.5 rounded-full bg-partout-checked'}
                style={{ left: `${item.startPercent}%`, width: `${item.widthPercent}%` }}
                aria-label={`${item.name} ${item.state} stay period`}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-end gap-4 text-[8px] text-partout-text-muted">
        <span className="flex items-center gap-1.5"><span className="h-1.5 w-4 rounded-full bg-partout-action" />Confirmed</span>
        <span className="flex items-center gap-1.5"><span className="h-1.5 w-4 rounded-full bg-partout-timeline" />Upcoming</span>
        <span className="flex items-center gap-1.5"><span className="h-1.5 w-4 bg-[repeating-linear-gradient(90deg,#aeb4ae_0_2px,transparent_2px_4px)]" />Checked out</span>
      </div>
    </section>
  )
}
