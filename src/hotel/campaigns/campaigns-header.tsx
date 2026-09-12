import { Link } from '@tanstack/react-router'
import { Plus } from 'lucide-react'

export function CampaignsHeader() {
  return (
    <header className="flex flex-wrap items-start justify-between gap-4">
      <h1 className="font-display text-[32px] font-normal leading-none tracking-[-0.03em] text-partout-text">
        Campaigns
      </h1>

      <Link
        to="/hotel/campaigns/new"
        className="inline-flex h-8 min-w-[120px] items-center justify-center gap-1.5 rounded-control bg-partout-action px-4 text-[8px] font-medium text-white transition-colors hover:bg-partout-action-hover"
      >
        <Plus aria-hidden="true" size={11} strokeWidth={1.8} />
        Create campaign
      </Link>
    </header>
  )
}
