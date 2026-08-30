import { CalendarDays, ChevronRight, DoorOpen, MessageCircle } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { CreatorAvatar } from '../../entities/creator/creator-avatar'
import type { HotelStay } from './stays.types'

export function StayContextPanel({ stay }: Readonly<{ stay: HotelStay }>) {
  const progress = Math.round((stay.agreedContentCompleted / stay.agreedContentTotal) * 100)

  return (
    <aside className="self-start overflow-hidden rounded-card border border-partout-border bg-partout-surface shadow-card" aria-label={`${stay.creatorName} stay details`}>
      <section className="p-5">
        <div className="flex items-center gap-3">
          <CreatorAvatar name={stay.creatorName} initials={stay.initials} size="medium" />
          <div className="min-w-0">
            <h2 className="truncate font-display text-[20px] font-normal leading-none tracking-[-0.02em] text-partout-text">{stay.creatorName}</h2>
            <p className="mt-1.5 text-[8px] text-partout-text-muted">{stay.status} · {stay.dates}</p>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <a href="/hotel/messages" className="flex-1">
            <Button className="h-8 w-full gap-1.5 px-3 text-[8px]">
              <MessageCircle aria-hidden="true" size={11} strokeWidth={1.6} />
              Message
            </Button>
          </a>
          <Button variant="secondary" className="h-8 flex-1 px-3 text-[8px]">View profile</Button>
        </div>
      </section>

      <section className="border-t border-partout-border p-5">
        <p className="text-[7px] font-medium uppercase tracking-[0.08em] text-partout-text-muted">Stay</p>
        <dl className="mt-3 space-y-3">
          <DetailRow icon={<DoorOpen aria-hidden="true" size={11} strokeWidth={1.5} />} label="Room" value={stay.room} />
          <DetailRow icon={<CalendarDays aria-hidden="true" size={11} strokeWidth={1.5} />} label="Check-in" value={stay.checkIn} />
          <DetailRow icon={<CalendarDays aria-hidden="true" size={11} strokeWidth={1.5} />} label="Check-out" value={stay.checkOut} />
        </dl>
        {stay.nextMoment ? (
          <div className="mt-4 rounded-control bg-partout-canvas px-3 py-2.5">
            <p className="text-[7px] text-partout-text-muted">Next</p>
            <p className="mt-1 text-[8px] font-medium text-partout-text">{stay.nextMoment}</p>
          </div>
        ) : null}
      </section>

      <section className="border-t border-partout-border p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[7px] font-medium uppercase tracking-[0.08em] text-partout-text-muted">Campaign</p>
            <p className="mt-1.5 text-[9px] font-medium text-partout-text">{stay.campaign}</p>
          </div>
          <button type="button" className="text-[7px] font-medium text-partout-action hover:text-partout-action-hover">View campaign</button>
        </div>
      </section>

      <section className="border-t border-partout-border p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[7px] font-medium uppercase tracking-[0.08em] text-partout-text-muted">Agreed content</p>
            <p className="mt-1.5 text-[9px] font-medium text-partout-text">{stay.agreedContentCompleted} of {stay.agreedContentTotal} published</p>
          </div>
          <span className="text-[8px] font-medium text-partout-text">{progress}%</span>
        </div>
        <span className="mt-2 block h-1 overflow-hidden rounded-full bg-partout-muted" aria-hidden="true">
          <span className="block h-full rounded-full bg-partout-action" style={{ width: `${progress}%` }} />
        </span>
      </section>

      <button type="button" className="flex w-full items-center justify-between border-t border-partout-border px-5 py-3 text-[8px] font-medium text-partout-action transition-colors hover:bg-partout-canvas hover:text-partout-action-hover">
        Open stay details
        <ChevronRight aria-hidden="true" size={11} strokeWidth={1.6} />
      </button>
    </aside>
  )
}

function DetailRow({ icon, label, value }: Readonly<{ icon: React.ReactNode; label: string; value: string }>) {
  return (
    <div className="grid grid-cols-[16px_54px_minmax(0,1fr)] items-center gap-1.5 text-[7px]">
      <span className="text-partout-text-muted">{icon}</span>
      <dt className="text-partout-text-muted">{label}</dt>
      <dd className="truncate text-right font-medium text-partout-text">{value}</dd>
    </div>
  )
}
