import { Plus } from 'lucide-react'
import { Button } from '../../components/ui/button'

export function CampaignsHeader() {
  return (
    <header className="flex flex-wrap items-start justify-between gap-4">
      <h1 className="font-display text-[32px] font-normal leading-none tracking-[-0.03em] text-partout-text">
        Campaigns
      </h1>

      <Button className="h-8 min-w-[120px] gap-1.5 px-4 text-[8px]">
        <Plus aria-hidden="true" size={11} strokeWidth={1.8} />
        Create campaign
      </Button>
    </header>
  )
}
