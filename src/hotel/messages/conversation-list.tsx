import { Search } from 'lucide-react'
import { CreatorAvatar } from '../../entities/creator/creator-avatar'
import type { ConversationListItem, MessageView } from './messages.types'

export function ConversationList({
  conversations,
  selectedCreatorId,
  view,
  query,
}: Readonly<{
  conversations: ReadonlyArray<ConversationListItem>
  selectedCreatorId: string
  view: MessageView
  query: string
}>) {
  return (
    <section className="min-w-0 overflow-hidden rounded-card border border-partout-border bg-partout-surface shadow-card" aria-label="Conversations">
      <form action="/hotel/messages" method="get" className="border-b border-partout-border p-3">
        {view === 'unread' ? <input type="hidden" name="view" value="unread" /> : null}
        <label className="flex h-8 items-center gap-2 rounded-control border border-partout-border bg-partout-canvas px-2.5 text-partout-text-muted">
          <Search aria-hidden="true" size={12} strokeWidth={1.7} />
          <span className="sr-only">Search conversations</span>
          <input
            type="search"
            name="q"
            defaultValue={query}
            placeholder="Search creators or messages"
            className="min-w-0 flex-1 bg-transparent text-[8px] text-partout-text outline-none placeholder:text-partout-text-muted"
          />
        </label>
      </form>

      <div className="divide-y divide-partout-border">
        {conversations.length ? conversations.map((conversation) => {
          const selected = conversation.creatorId === selectedCreatorId
          const params = new URLSearchParams({ creator: conversation.creatorId })
          if (view === 'unread') params.set('view', 'unread')
          if (query) params.set('q', query)

          return (
            <a
              key={conversation.id}
              href={`/hotel/messages?${params.toString()}`}
              className={`grid w-full grid-cols-[32px_minmax(0,1fr)_auto] gap-2.5 px-3 py-3 text-left transition-colors ${
                selected ? 'bg-partout-muted/80' : 'hover:bg-partout-canvas'
              }`}
              aria-current={selected ? 'page' : undefined}
            >
              <CreatorAvatar name={conversation.creatorName} initials={conversation.initials} size="small" className="rounded-full" />
              <span className="min-w-0">
                <span className="flex items-center gap-1.5">
                  <span className="truncate text-[9px] font-medium text-partout-text">{conversation.creatorName}</span>
                  {conversation.unread ? (
                    <span className="grid size-4 shrink-0 place-items-center rounded-full bg-partout-action text-[6px] font-semibold text-white">{conversation.unread}</span>
                  ) : null}
                </span>
                <span className="mt-0.5 block truncate text-[7px] font-medium text-partout-text-muted">{conversation.relationshipLabel}</span>
                <span className="mt-0.5 block truncate text-[7px] text-partout-text-muted">{conversation.contextLabel}</span>
                <span className="mt-1 block truncate text-[7px] text-partout-text-muted">{conversation.preview}</span>
              </span>
              <span className="pt-0.5 text-[6px] text-partout-text-muted">{conversation.timestamp}</span>
            </a>
          )
        }) : (
          <p className="px-4 py-8 text-[8px] text-partout-text-muted">No conversations match this view.</p>
        )}
      </div>
    </section>
  )
}
