import { campaigns } from '../../data/mock/campaigns'
import { CampaignsHeader } from './campaigns-header'
import { CampaignsTable } from './campaigns-table'
import { CampaignsTabs } from './campaigns-tabs'

export function CampaignsPage() {
  return (
    <div>
      <CampaignsHeader />
      <CampaignsTabs />
      <CampaignsTable campaigns={campaigns} />
    </div>
  )
}
