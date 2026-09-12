import { conversationContexts, conversationMessages, conversations } from '../../data/mock/messages'
import { ConversationContextPanel } from './conversation-context'
import { ConversationList } from './conversation-list'
import { ConversationThread } from './conversation-thread'
import { MessagesTabs } from './messages-tabs'
import type { MessageView } from './messages.types'

export function MessagesPage({
  selectedCreatorId,
  view = 'all',
  query = '',
}: Readonly<{
  selectedCreatorId?: string
  view?: MessageView
  query?: string
}>) {
  const normalizedQuery = query.trim().toLowerCase()
  const unreadCount = conversations.filter((conversation) => (conversation.unread ?? 0) > 0).length
  const visibleConversations = conversations.filter((conversation) => {
    if (view === 'unread' && !(conversation.unread && conversation.unread > 0)) return false
    if (!normalizedQuery) return true

    return [conversation.creatorName, conversation.preview, conversation.relationshipLabel, conversation.contextLabel]
      .some((value) => value.toLowerCase().includes(normalizedQuery))
  })
  const activeConversation = conversations.find((conversation) => conversation.id === selectedCreatorId) ?? visibleConversations[0]
  const activeContext = activeConversation ? conversationContexts[activeConversation.id] : undefined
  const activeMessages = activeConversation ? conversationMessages[activeConversation.id] ?? [] : []

  return (
    <div>
      <header>
        <h1 className="font-display text-[32px] font-normal leading-none tracking-[-0.03em] text-partout-text">Messages</h1>
        <p className="mt-2 text-[9px] text-partout-text-muted">One conversation for every creator relationship.</p>
      </header>
      <MessagesTabs view={view} totalCount={conversations.length} unreadCount={unreadCount} />

      <div className="mt-3 grid items-start gap-3 xl:grid-cols-[minmax(0,27fr)_minmax(0,48fr)_minmax(0,25fr)]">
        <ConversationList
          conversations={visibleConversations}
          selectedId={activeConversation?.id ?? ''}
          view={view}
          query={query}
        />
        {activeConversation && activeContext ? (
          <>
            <ConversationThread conversation={activeConversation} context={activeContext} messages={activeMessages} />
            <ConversationContextPanel context={activeContext} />
          </>
        ) : (
          <section className="xl:col-span-2 grid min-h-[360px] place-items-center rounded-card border border-partout-border bg-partout-surface p-8 text-center shadow-card">
            <div>
              <h2 className="font-display text-[22px] font-normal text-partout-text">No conversation here</h2>
              <p className="mt-2 text-[8px] text-partout-text-muted">Try another search or return to all conversations.</p>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
