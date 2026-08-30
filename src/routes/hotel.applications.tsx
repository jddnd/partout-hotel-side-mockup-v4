import { createFileRoute } from '@tanstack/react-router'
import { ApplicationsPage } from '../hotel/applications/applications-page'

export const Route = createFileRoute('/hotel/applications')({
  component: ApplicationsPage,
})
