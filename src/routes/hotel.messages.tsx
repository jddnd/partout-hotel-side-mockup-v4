import { createFileRoute } from '@tanstack/react-router'
import { MessagesPage } from '../hotel/messages/messages-page'

type MessagesSearch = {
  creator?: string
  view?: 'all' | 'unread'
  q?: string
}

export const Route = createFileRoute('/hotel/messages')({
  validateSearch: (search: Record<string, unknown>): MessagesSearch => ({
    ...(typeof search.creator === 'string' ? { creator: search.creator } : {}),
    ...(search.view === 'unread' ? { view: 'unread' as const } : {}),
    ...(typeof search.q === 'string' && search.q ? { q: search.q } : {}),
  }),
  component: MessagesRoute,
})

function MessagesRoute() {
  const search = Route.useSearch()

  return (
    <MessagesPage
      selectedCreatorId={search.creator}
      view={search.view ?? 'all'}
      query={search.q ?? ''}
    />
  )
}
