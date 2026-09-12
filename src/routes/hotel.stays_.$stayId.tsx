import { createFileRoute } from '@tanstack/react-router'
import { StayWorkspacePage } from '../hotel/stays/stay-workspace-page'

export const Route = createFileRoute('/hotel/stays_/$stayId')({
  component: StayWorkspaceRoute,
})

function StayWorkspaceRoute() {
  const { stayId } = Route.useParams()
  return <StayWorkspacePage stayId={stayId} />
}
