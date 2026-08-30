import { ChevronRight } from 'lucide-react'
import { CreatorAvatar } from '../../entities/creator/creator-avatar'
import type { HotelStay, StayStatus } from './stays.types'

const statusClasses: Record<StayStatus, string> = {
  'In house': 'bg-partout-success-soft text-partout-success-text',
  'Arrives today': 'bg-[#fbf5ed] text-partout-warm',
  Tomorrow: 'bg-[#eef4f5] text-[#58777a]',
  Upcoming: 'bg-partout-muted text-partout-text-muted',
}

export function StaysList({ stays, selectedId }: Readonly<{ stays: ReadonlyArray<HotelStay>; selectedId: string }>) {
  return (
    <section className="overflow-hidden rounded-card border border-partout-border bg-partout-surface shadow-card" aria-labelledby="active-stays-title">
      <div className="flex items-center justify-between border-b border-partout-border px-4 py-3">
        <div>
          <h2 id="active-stays-title" className="text-[10px] font-medium text-partout-text">Active stays</h2>
          <p className="mt-1 text-[7px] text-partout-text-muted">Arrival, room and publishing context in one place</p>
        </div>
        <span className="text-[7px] text-partout-text-muted">{stays.length} shown</span>
      </div>

      <div className="divide-y divide-partout-border">
        {stays.map((stay) => {
          const selected = stay.id === selectedId
          const progress = Math.round((stay.agreedContentCompleted / stay.agreedContentTotal) * 100)

          return (
            <article key={stay.id} className={`grid min-h-[82px] grid-cols-[minmax(180px,1.35fr)_minmax(120px,1fr)_92px_118px_24px] items-center gap-3 px-4 py-3 transition-colors ${selected ? 'bg-partout-canvas' : 'hover:bg-partout-canvas/55'}`}>
              <div className="flex min-w-0 items-center gap-3">
                <CreatorAvatar name={stay.creatorName} initials={stay.initials} size="medium" />
                <div className="min-w-0">
                  <p className="truncate text-[9px] font-semibold text-partout-text">{stay.creatorName}</p>
                  <p className="mt-1 text-[7px] text-partout-text-muted">{stay.dates}</p>
                  {stay.nextMoment ? <p className="mt-1 truncate text-[7px] font-medium text-partout-action">{stay.nextMoment}</p> : null}
                </div>
              </div>

              <div className="min-w-0">
                <p className="truncate text-[8px] font-medium text-partout-text">{stay.campaign}</p>
                <p className="mt-1 truncate text-[7px] text-partout-text-muted">{stay.room}</p>
              </div>

              <div>
                <p className="text-[7px] text-partout-text-muted">Published</p>
                <p className="mt-1 text-[8px] font-medium text-partout-text">{stay.agreedContentCompleted} of {stay.agreedContentTotal}</p>
                <span className="mt-1.5 block h-1 overflow-hidden rounded-full bg-partout-muted" aria-hidden="true">
                  <span className="block h-full rounded-full bg-partout-action" style={{ width: `${progress}%` }} />
                </span>
              </div>

              <div>
                <span className={`inline-flex rounded-full px-2 py-1 text-[7px] font-medium ${statusClasses[stay.status]}`}>{stay.status}</span>
              </div>

              <ChevronRight aria-hidden="true" size={13} strokeWidth={1.6} className={selected ? 'text-partout-action' : 'text-partout-text-muted'} />
            </article>
          )
        })}
      </div>
    </section>
  )
}
