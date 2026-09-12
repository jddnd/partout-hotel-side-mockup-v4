import { createFileRoute } from '@tanstack/react-router'
import { TodayPage } from '../hotel/today/today-page'

export const Route = createFileRoute('/hotel/')({
  component: TodayPage,
})
