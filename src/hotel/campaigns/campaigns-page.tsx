import { campaigns } from '../../data/mock/campaigns'
import { getMockCampaigns } from './campaign-mock-storage'
import { CampaignsHeader } from './campaigns-header'
import { CampaignsTable } from './campaigns-table'
import { CampaignsTabs } from './campaigns-tabs'

export function CampaignsPage() {
  const visibleCampaigns = getMockCampaigns(campaigns)

  return (
    <div>
      <CampaignsHeader />
      <CampaignsTabs />
      <CampaignsTable campaigns={visibleCampaigns} />
    </div>
  )
}
