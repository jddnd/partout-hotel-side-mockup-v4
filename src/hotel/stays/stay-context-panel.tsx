import { CalendarDays, ChevronRight, DoorOpen, MessageCircle } from 'lucide-react'
import { getCollaboration } from '../../data/mock/collaborations'
import { CreatorAvatar } from '../../entities/creator/creator-avatar'
import { getStayCreatorProfileHref, getStayMessageHref } from './stay-navigation'
import type { HotelStay } from './stays.types'

export function StayContextPanel({ stay }: Readonly<{ stay: HotelStay }>) {
  const collaboration = getCollaboration(stay.collaborationId)
  const agreedContentCompleted = collaboration?.agreedContentCompleted ?? 0
  const agreedContentTotal = collaboration?.agreedContentTotal ?? 0
  const progress = agreedContentTotal > 0 ? Math.round((agreedContentCompleted / agreedContentTotal) * 100) : 0

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

        <p className="mt-4 text-[8px] leading-4 text-partout-text-muted">{stay.relationshipNote}</p>

        <div className="mt-4 flex gap-2">
          <a
            href={getStayMessageHref(stay)}
            className="inline-flex h-8 flex-1 items-center justify-center gap-1.5 rounded-control bg-partout-action px-3 text-[8px] font-medium text-white transition-colors hover:bg-partout-action-hover"
          >
            <MessageCircle aria-hidden="true" size={11} strokeWidth={1.6} />
            Message
          </a>
          <a
            href={getStayCreatorProfileHref(stay)}
            className="inline-flex h-8 flex-1 items-center justify-center rounded-control border border-partout-border bg-partout-surface px-3 text-[8px] font-medium text-partout-text transition-colors hover:bg-partout-muted"
          >
            View profile
          </a>
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
          <a href={`/hotel/campaigns/${stay.campaignId}`} className="text-[7px] font-medium text-partout-action hover:text-partout-action-hover">View campaign</a>
        </div>
      </section>

      <section className="border-t border-partout-border p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[7px] font-medium uppercase tracking-[0.08em] text-partout-text-muted">Agreed content</p>
            <p className="mt-1.5 text-[9px] font-medium text-partout-text">{agreedContentCompleted} of {agreedContentTotal} published</p>
          </div>
          <span className="text-[8px] font-medium text-partout-text">{progress}%</span>
        </div>
        <span className="mt-2 block h-1 overflow-hidden rounded-full bg-partout-muted" aria-hidden="true">
          <span className="block h-full rounded-full bg-partout-action" style={{ width: `${progress}%` }} />
        </span>
        <p className="mt-2 text-[7px] leading-4 text-partout-text-muted">Published content is observed here as it goes live. There is no approval queue.</p>
      </section>

      <a href={`/hotel/stays/${stay.id}`} className="flex w-full items-center justify-between border-t border-partout-border px-5 py-3 text-[8px] font-medium text-partout-action transition-colors hover:bg-partout-canvas hover:text-partout-action-hover">
        Open collaboration
        <ChevronRight aria-hidden="true" size={11} strokeWidth={1.6} />
      </a>
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
