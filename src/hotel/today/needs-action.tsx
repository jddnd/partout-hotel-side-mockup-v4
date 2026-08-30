import { ChevronRight } from 'lucide-react'
import { Button } from '../../components/ui/button'
import type { ActionItem } from './today.types'

export function NeedsAction({ items }: Readonly<{ items: ActionItem[] }>) {
  return (
    <section className="rounded-card border border-partout-border bg-partout-surface p-4 shadow-card">
      <h2 className="text-xs font-semibold">Needs action</h2>
      <ul className="mt-3 divide-y divide-partout-border">
        {items.map((item) => (
          <li key={item.label}>
            <button type="button" className="grid min-h-10 w-full grid-cols-[24px_minmax(0,1fr)_16px] items-center gap-2 py-2 text-left hover:text-partout-action">
              <span className="text-sm font-semibold">{item.count}</span>
              <span className="text-[10px]">{item.label}</span>
              <ChevronRight aria-hidden="true" size={13} strokeWidth={1.7} />
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-4 border-t border-partout-border pt-4">
        <h3 className="text-[10px] font-semibold">Quick actions</h3>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <Button className="h-8 px-2 text-[10px]">Create campaign</Button>
          <Button variant="secondary" className="h-8 px-2 text-[10px]">Invite talent</Button>
          <Button variant="secondary" className="h-8 px-2 text-[10px]">Assign room</Button>
          <Button variant="secondary" className="h-8 px-2 text-[10px]">Send message</Button>
        </div>
      </div>
    </section>
  )
}
