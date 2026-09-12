import { createFileRoute } from '@tanstack/react-router'
import { TodayPage } from '../hotel/today/today-page'

// Visual comparison branch: intentionally no runtime or UI change.
export const Route = createFileRoute('/hotel/')({
  component: TodayPage,
})
