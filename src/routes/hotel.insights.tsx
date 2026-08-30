import { createFileRoute } from '@tanstack/react-router'
import { InsightsPage } from '../hotel/insights/insights-page'

export const Route = createFileRoute('/hotel/insights')({
  component: InsightsPage,
})
