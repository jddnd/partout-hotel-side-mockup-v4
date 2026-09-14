import { ChevronRight } from 'lucide-react'
import { Button } from '../../components/ui/button'
import type { ActionItem } from './today.types'

const actionRowClassName =
  'grid min-h-10 w-full grid-cols-[22px_minmax(0,1fr)_14px] items-center gap-2 text-left transition-colors hover:text-partout-action'

function ActionRow({ item }: Readonly<{ item: ActionItem }>) {
  const content = (
    <>
      <span className="text-[14px] font-semibold leading-none">{item.count}</span>
      <span className="text-[9px] leading-tight">{item.label}</span>
      <ChevronRight aria-hidden="true" size={12} strokeWidth={1.8} />
    </>
  )

  if (item.href) {
    return (
      <a href={item.href} className={actionRowClassName}>
        {content}
      </a>
    )
  }

  return (
    <button type="button" className={actionRowClassName}>
      {content}
    </button>
  )
}

export function NeedsAction({ items }: Readonly<{ items: ActionItem[] }>) {
  return (
    <section className="h-full rounded-card border border-partout-border bg-partout-surface p-4 shadow-card">
      <h2 className="text-[11px] font-semibold">Needs action</h2>
      <ul className="mt-3">
        {items.map((item) => (
          <li key={item.label}>
            <ActionRow item={item} />
          </li>
        ))}
      </ul>

      <button type="button" className="mt-1.5 text-[9px] font-medium text-partout-text-muted transition-colors hover:text-partout-action">
        View all tasks <span aria-hidden="true">›</span>
      </button>

      <div className="mt-4 border-t border-partout-border pt-4">
        <h3 className="text-[10px] font-semibold">Quick actions</h3>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <a
            href="/hotel/campaigns/new"
            className="inline-flex h-8 items-center justify-center rounded-control bg-partout-action px-2 text-[9px] font-medium text-white transition-colors hover:bg-partout-action-hover"
          >
            Create campaign
          </a>
          <Button
            variant="secondary"
            className="h-8 px-2 text-[9px]"
            onClick={() => window.location.assign('/hotel/invitations/new')}
          >
            Invite talent
          </Button>
          <a
            href="/hotel/stays/assign-room"
            className="inline-flex h-8 items-center justify-center gap-2 rounded-control border border-partout-border bg-partout-surface px-2 text-[9px] font-medium text-partout-text transition-colors hover:bg-partout-muted"
          >
            Assign room
          </a>
          <Button
            variant="secondary"
            className="h-8 px-2 text-[9px]"
            onClick={() => window.location.assign('/hotel/messages')}
          >
            Send message
          </Button>
        </div>
      </div>
    </section>
  )
}
