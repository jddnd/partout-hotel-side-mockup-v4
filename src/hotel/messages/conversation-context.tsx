import { CalendarDays, ChevronRight, DoorOpen } from 'lucide-react'
import type { ConversationContext } from './messages.types'

export function ConversationContextPanel({ context }: Readonly<{ context: ConversationContext }>) {
  const progress = Math.round((context.agreedContentCompleted / context.agreedContentTotal) * 100)

  return (
    <aside className="self-start overflow-hidden rounded-card border border-partout-border bg-partout-surface shadow-card" aria-label="Conversation context">
      <section className="p-4">
        <p className="text-[7px] font-medium uppercase tracking-[0.08em] text-partout-text-muted">Campaign</p>
        <div className="mt-2 flex gap-2.5">
          <span className="hotel-cover-placeholder block h-12 w-[68px] shrink-0 rounded-control border border-partout-border" role="img" aria-label={`${context.campaign} campaign placeholder`} />
          <div className="min-w-0 pt-0.5">
            <h2 className="truncate text-[9px] font-medium text-partout-text">{context.campaign}</h2>
            <p className="mt-1 text-[7px] text-partout-text-muted">{context.campaignDates}</p>
            <span className="mt-2 inline-flex rounded-full bg-partout-success-soft px-2 py-1 text-[6px] font-medium text-partout-success-text">Active</span>
          </div>
        </div>
      </section>

      <section className="border-t border-partout-border p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[7px] font-medium uppercase tracking-[0.08em] text-partout-text-muted">Stay</p>
            <p className="mt-1 text-[9px] font-medium text-partout-text">{context.stayStatus}</p>
          </div>
          <span className="inline-flex rounded-full bg-partout-success-soft px-2 py-1 text-[6px] font-medium text-partout-success-text">In house</span>
        </div>

        <dl className="mt-3 space-y-2.5">
          <ContextRow icon={<DoorOpen aria-hidden="true" size={11} strokeWidth={1.5} />} label="Room" value={context.room} />
          <ContextRow icon={<CalendarDays aria-hidden="true" size={11} strokeWidth={1.5} />} label="Check-in" value={context.checkIn} />
          <ContextRow icon={<CalendarDays aria-hidden="true" size={11} strokeWidth={1.5} />} label="Check-out" value={context.checkOut} />
        </dl>
      </section>

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
      </section>

      <button type="button" className="flex w-full items-center justify-between border-t border-partout-border px-4 py-3 text-[8px] font-medium text-partout-action transition-colors hover:bg-partout-canvas hover:text-partout-action-hover">
        View stay
        <ChevronRight aria-hidden="true" size={11} strokeWidth={1.6} />
      </button>
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
