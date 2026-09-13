import { createFileRoute } from '@tanstack/react-router'
import { CampaignDetailPage } from '../hotel/campaigns/campaign-detail-page'
import { SentInvitationsSection } from '../hotel/invitations/sent-invitations-section'

export const Route = createFileRoute('/hotel/campaigns_/$campaignId')({
  component: CampaignDetailRoute,
})

function CampaignDetailRoute() {
  const { campaignId } = Route.useParams()

  return (
    <>
      <CampaignDetailPage campaignId={campaignId} />
      <SentInvitationsSection campaignId={campaignId} />
    </>
  )
}
