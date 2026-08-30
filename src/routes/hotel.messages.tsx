import { createFileRoute } from '@tanstack/react-router'
import { MessagesPage } from '../hotel/messages/messages-page'

export const Route = createFileRoute('/hotel/messages')({
  component: MessagesPage,
})
