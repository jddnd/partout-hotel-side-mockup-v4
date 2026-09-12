import { createFileRoute } from '@tanstack/react-router'
import { StaysPage } from '../hotel/stays/stays-page'

export const Route = createFileRoute('/hotel/stays')({
  component: StaysPage,
})
