import { createFileRoute } from '@tanstack/react-router'
import { MessagesPage } from '../hotel/messages/messages-page'

export const Route = createFileRoute('/hotel/messages')({
  validateSearch: (search: Record<string, unknown>) => ({
    creator: typeof search.creator === 'string' ? search.creator : undefined,
    view: search.view === 'unread' ? 'unread' as const : 'all' as const,
    q: typeof search.q === 'string' ? search.q : '',
  }),
  component: MessagesRoute,
})

function MessagesRoute() {
  const search = Route.useSearch()

  return (
    <MessagesPage
      selectedCreatorId={search.creator}
      view={search.view}
      query={search.q}
    />
  )
}
