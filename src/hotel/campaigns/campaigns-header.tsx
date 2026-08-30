import { ChevronDown, Plus } from 'lucide-react'
import { Button } from '../../components/ui/button'

export function CampaignsHeader() {
  return (
    <header className="flex flex-wrap items-start justify-between gap-4">
      <h1 className="font-display text-[32px] font-normal leading-none tracking-[-0.03em] text-partout-text">
        Campaigns
      </h1>

      <div className="flex items-center gap-2">
        <Button className="h-8 gap-1.5 px-3 text-[8px]">
          <Plus aria-hidden="true" size={11} strokeWidth={1.8} />
          Create campaign
        </Button>
        <button
          type="button"
          className="flex h-8 min-w-[104px] items-center justify-between gap-3 rounded-control border border-partout-border bg-partout-surface px-3 text-[8px] text-partout-text transition-colors hover:bg-partout-muted"
        >
          <span>All hotels</span>
          <ChevronDown aria-hidden="true" size={11} strokeWidth={1.7} className="text-partout-text-muted" />
        </button>
      </div>
    </header>
  )
}
