import { createFileRoute } from '@tanstack/react-router'
import { ProfileReviewPage } from '../hotel/profile-review/profile-review-page'

export const Route = createFileRoute('/hotel/applications/$creatorId')({
  component: ProfileReviewRoute,
})

function ProfileReviewRoute() {
  const { creatorId } = Route.useParams()
  return <ProfileReviewPage creatorId={creatorId} />
}
