import { createFileRoute } from '@tanstack/react-router'
import { CreatorProfilePage } from '../hotel/creators/creator-profile-page'

export const Route = createFileRoute('/hotel/creators_/$creatorId')({
  component: CreatorProfileRoute,
})

function CreatorProfileRoute() {
  const { creatorId } = Route.useParams()
  return <CreatorProfilePage creatorId={creatorId} />
}
