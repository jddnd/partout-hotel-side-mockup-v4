import { useState } from 'react'
import { campaigns } from '../../data/mock/campaigns'
import { CampaignCreateDrawer } from './campaign-create-drawer'
import { CampaignsHeader } from './campaigns-header'
import { CampaignsTable } from './campaigns-table'
import { CampaignsTabs } from './campaigns-tabs'

export function CampaignsPage() {
  const [createOpen, setCreateOpen] = useState(false)

  return (
    <div>
      <CampaignsHeader onCreate={() => setCreateOpen(true)} />
      <CampaignsTabs />
      <CampaignsTable campaigns={campaigns} />
      {createOpen ? <CampaignCreateDrawer onClose={() => setCreateOpen(false)} /> : null}
    </div>
  )
}
