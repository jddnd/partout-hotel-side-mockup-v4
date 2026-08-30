import { GripVertical } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { CreatorPortrait } from '../../entities/creator/creator-portrait'
import type { ShortlistCreator } from './applications.types'

export function ShortlistPanel({ creators }: Readonly<{ creators: ShortlistCreator[] }>) {
  return (
    <aside className="h-full rounded-card border border-partout-border bg-partout-surface p-4 shadow-card" aria-labelledby="shortlist-title">
      <div className="flex items-center justify-between gap-3">
        <h2 id="shortlist-title" className="text-[11px] font-semibold">Shortlist ({creators.length})</h2>
        <button type="button" className="text-[9px] font-medium text-partout-text-muted transition-colors hover:text-partout-action">Manage</button>
      </div>

      <ol className="mt-3 divide-y divide-partout-border/80">
        {creators.map((creator) => (
          <li key={creator.id} className="grid grid-cols-[40px_minmax(0,1fr)_auto] items-center gap-2 py-3">
            <CreatorPortrait name={creator.name} className="size-10 rounded-control" />
            <div className="min-w-0">
              <p className="truncate text-[9px] font-medium">{creator.name}</p>
              <p className="mt-1 truncate text-[8px] text-partout-text-muted">{creator.location}</p>
            </div>
            <span className="text-[8px] font-medium text-partout-success-text">{creator.fitScore}</span>
          </li>
        ))}
      </ol>

      <div className="mt-3 flex items-center gap-1.5 border-t border-partout-border pt-3 text-[8px] text-partout-text-muted">
        <GripVertical aria-hidden="true" size={11} strokeWidth={1.7} />
        <span>Drag to reorder</span>
      </div>

      <Button variant="secondary" className="mt-3 h-8 w-full text-[9px]">View shortlist</Button>
    </aside>
  )
}
