import { createFileRoute } from '@tanstack/react-router'
import { AssignRoomPage } from '../hotel/stays/assign-room-page'

export const Route = createFileRoute('/hotel/stays_/assign-room')({
  component: AssignRoomPage,
})
