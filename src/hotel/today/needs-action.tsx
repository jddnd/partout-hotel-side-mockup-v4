import { ChevronRight } from 'lucide-react'
import { Button } from '../../components/ui/button'
import type { ActionItem } from './today.types'

export function NeedsAction({ items }: Readonly<{ items: ActionItem[] }>) {
  return (
    <section className="h-full rounded-card border border-partout-border bg-partout-surface p-4 shadow-card">
      <h2 className="text-[11px] font-semibold">Needs action</h2>
      <ul className="mt-2">
        {items.map((item) => (
          <li key={item.label}>
            <button type="button" className="grid min-h-9 w-full grid-cols-[22px_minmax(0,1fr)_14px] items-center gap-2 text-left transition-colors hover:text-partout-action">
              <span className="text-[14px] font-semibold leading-none">{item.count}</span>
              <span className="text-[9px] leading-tight">{item.label}</span>
              <ChevronRight aria-hidden="true" size={12} strokeWidth={1.8} />
            </button>
          </li>
        ))}
      </ul>

      <button type="button" className="mt-1 text-[9px] font-medium text-partout-text-muted transition-colors hover:text-partout-action">
        View all tasks <span aria-hidden="true">›</span>
      </button>

      <div className="mt-3 border-t border-partout-border pt-3">
        <h3 className="text-[10px] font-semibold">Quick actions</h3>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <Button className="h-8 px-2 text-[9px]">Create campaign</Button>
          <Button variant="secondary" className="h-8 px-2 text-[9px]">Invite talent</Button>
          <Button variant="secondary" className="h-8 px-2 text-[9px]">Assign room</Button>
          <Button variant="secondary" className="h-8 px-2 text-[9px]">Send message</Button>
        </div>
      </div>
    </section>
  )
}
