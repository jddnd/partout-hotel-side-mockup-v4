import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { InsightsPage } from '../hotel/insights/insights-page'
import type { InsightsView } from '../hotel/insights/insights.types'

const insightsSearchSchema = z.object({
  view: z.enum(['overview', 'audience', 'campaigns', 'content', 'bookings']).optional(),
})

export const Route = createFileRoute('/hotel/insights')({
  validateSearch: insightsSearchSchema,
  component: InsightsRoute,
})

function InsightsRoute() {
  const search = Route.useSearch()
  const navigate = Route.useNavigate()
  const activeView: InsightsView = search.view ?? 'overview'

  return (
    <InsightsPage
      activeView={activeView}
      onViewChange={(view) => {
        void navigate({ search: view === 'overview' ? {} : { view } })
      }}
    />
  )
}
