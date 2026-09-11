import type { CampaignStatus } from './campaigns.types'

const statusClasses: Record<CampaignStatus, string> = {
  Active: 'border-partout-success-soft bg-partout-success-soft text-partout-success-text',
  'Ending soon': 'border-[#efe5d9] bg-[#fbf5ed] text-partout-warm',
  Upcoming: 'border-[#dce6e8] bg-[#eef4f5] text-[#58777a]',
  Draft: 'border-partout-border bg-partout-muted text-partout-text-muted',
}

export function CampaignStatusBadge({ status }: Readonly<{ status: CampaignStatus }>) {
  return (
    <span className={`inline-flex rounded-full border px-2 py-1 text-[7px] font-medium ${statusClasses[status]}`}>
      {status}
    </span>
  )
}
