import { CalendarDays, DoorOpen } from 'lucide-react'
import type { ConversationContext } from './messages.types'

export function ConversationContextPanel({ context }: Readonly<{ context: ConversationContext }>) {
  const hasContentProgress = typeof context.agreedContentCompleted === 'number' && typeof context.agreedContentTotal === 'number' && context.agreedContentTotal > 0
  const progress = hasContentProgress
    ? Math.round((context.agreedContentCompleted! / context.agreedContentTotal!) * 100)
    : 0

  return (
    <aside className="self-start overflow-hidden rounded-card border border-partout-border bg-partout-surface shadow-card" aria-label="Conversation context">
      <section className="p-4">
        <p className="text-[7px] font-medium uppercase tracking-[0.08em] text-partout-text-muted">Relationship</p>
        <h2 className="mt-2 font-display text-[20px] font-normal leading-none tracking-[-0.02em] text-partout-text">{context.relationshipLabel}</h2>
        <p className="mt-2 text-[8px] leading-4 text-partout-text-muted">{context.relationshipDetail}</p>
        <p className="mt-2 text-[7px] text-partout-text-muted">Known since {context.knownSince}</p>
      </section>

      <section className="border-t border-partout-border p-4">
        <p className="text-[7px] font-medium uppercase tracking-[0.08em] text-partout-text-muted">Current context</p>
        <div className="mt-2 flex gap-2.5">
          <span className="hotel-cover-placeholder block h-12 w-[68px] shrink-0 rounded-control border border-partout-border" role="img" aria-label={`${context.campaign} campaign placeholder`} />
          <div className="min-w-0 pt-0.5">
            <a href={`/hotel/campaigns/${context.campaignId}`} className="truncate text-[9px] font-medium text-partout-text transition-colors hover:text-partout-action">
              {context.campaign}
            </a>
            <p className="mt-1 text-[7px] text-partout-text-muted">{context.campaignDates}</p>
            <p className="mt-1.5 text-[7px] font-medium text-partout-action">{context.currentContext}</p>
          </div>
        </div>
      </section>

      {context.stayId && context.room && context.checkIn && context.checkOut ? (
        <section className="border-t border-partout-border p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[7px] font-medium uppercase tracking-[0.08em] text-partout-text-muted">Current stay</p>
            <a href={`/hotel/stays/${context.stayId}`} className="text-[7px] font-medium text-partout-action transition-colors hover:text-partout-action-hover">Open stay</a>
          </div>
          <dl className="mt-3 space-y-2.5">
            <ContextRow icon={<DoorOpen aria-hidden="true" size={11} strokeWidth={1.5} />} label="Room" value={context.room} />
            <ContextRow icon={<CalendarDays aria-hidden="true" size={11} strokeWidth={1.5} />} label="Check-in" value={context.checkIn} />
            <ContextRow icon={<CalendarDays aria-hidden="true" size={11} strokeWidth={1.5} />} label="Check-out" value={context.checkOut} />
          </dl>
        </section>
      ) : null}

      {hasContentProgress ? (
        <section className="border-t border-partout-border p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[7px] font-medium uppercase tracking-[0.08em] text-partout-text-muted">Agreed content</p>
              <p className="mt-1 text-[9px] font-medium text-partout-text">{context.agreedContentCompleted} of {context.agreedContentTotal} published</p>
            </div>
            <span className="text-[8px] font-medium text-partout-text">{progress}%</span>
          </div>
          <span className="mt-2 block h-1 overflow-hidden rounded-full bg-partout-muted" aria-hidden="true">
            <span className="block h-full rounded-full bg-partout-action" style={{ width: `${progress}%` }} />
          </span>
          <p className="mt-2 text-[6px] leading-3.5 text-partout-text-muted">Observed publishing progress only — nothing to approve here.</p>
        </section>
      ) : null}

      <section className="border-t border-partout-border p-4">
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-[7px] font-medium uppercase tracking-[0.08em] text-partout-text-muted">Together before</p>
          <span className="text-[7px] text-partout-text-muted">{context.previousStays.length} previous</span>
        </div>
        {context.previousStays.length ? (
          <div className="mt-2 divide-y divide-partout-border">
            {context.previousStays.map((stay) => (
              <p key={stay} className="py-2 text-[8px] text-partout-text">{stay}</p>
            ))}
          </div>
        ) : (
          <p className="mt-2 text-[8px] leading-4 text-partout-text-muted">This is the beginning of the relationship.</p>
        )}
      </section>
    </aside>
  )
}

function ContextRow({ icon, label, value }: Readonly<{ icon: React.ReactNode; label: string; value: string }>) {
  return (
    <div className="grid grid-cols-[16px_54px_minmax(0,1fr)] items-center gap-1.5 text-[7px]">
      <span className="text-partout-text-muted">{icon}</span>
      <dt className="text-partout-text-muted">{label}</dt>
      <dd className="truncate text-right font-medium text-partout-text">{value}</dd>
    </div>
  )
}
