import { createFileRoute } from '@tanstack/react-router'
import { InviteTalentPage } from '../hotel/invitations/invite-talent-page'

export const Route = createFileRoute('/hotel/invitations_/new')({
  component: InviteTalentPage,
})
