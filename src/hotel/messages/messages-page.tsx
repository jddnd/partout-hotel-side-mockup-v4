import { conversationMessages, conversations } from '../../data/mock/messages'
import { ConversationContextPanel } from './conversation-context'
import { ConversationList } from './conversation-list'
import { ConversationThread } from './conversation-thread'
import { resolveConversationContext, resolveConversationListItem } from './message-model'
import { MessagesTabs } from './messages-tabs'
import type { MessageView } from './messages.types'
import { sendMockRelationshipMessage } from './relationship-message-send-action'
import { getMockConversationMessages, hydrateMockConversation } from './relationship-message-storage'

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
  const conversationViews = conversations.flatMap((baseConversation) => {
    const conversation = hydrateMockConversation(baseConversation)
    const listItem = resolveConversationListItem(conversation)
    const context = resolveConversationContext(conversation)
    return listItem && context ? [{ conversation, listItem, context }] : []
  })
  const unreadCount = conversationViews.filter(({ conversation }) => (conversation.unread ?? 0) > 0).length
  const visibleConversations = conversationViews.filter(({ conversation, listItem }) => {
    if (view === 'unread' && !(conversation.unread && conversation.unread > 0)) return false
    if (!normalizedQuery) return true

    return [listItem.creatorName, listItem.preview, listItem.relationshipLabel, listItem.contextLabel]
      .some((value) => value.toLowerCase().includes(normalizedQuery))
  })
  const activeConversation = conversationViews.find(({ conversation }) => conversation.creatorId === selectedCreatorId) ?? visibleConversations[0]
  const activeMessages = activeConversation
    ? getMockConversationMessages(conversationMessages, activeConversation.conversation)
    : []

  return (
    <div>
      <header>
        <h1 className="font-display text-[32px] font-normal leading-none tracking-[-0.03em] text-partout-text">Messages</h1>
        <p className="mt-2 text-[9px] text-partout-text-muted">One conversation for every creator relationship.</p>
      </header>
      <MessagesTabs view={view} totalCount={conversationViews.length} unreadCount={unreadCount} />

      <div className="mt-3 grid items-start gap-3 xl:grid-cols-[minmax(0,27fr)_minmax(0,48fr)_minmax(0,25fr)]">
        <ConversationList
          conversations={visibleConversations.map(({ listItem }) => listItem)}
          selectedCreatorId={activeConversation?.conversation.creatorId ?? ''}
          view={view}
          query={query}
        />
        {activeConversation ? (
          <>
            <ConversationThread
              conversation={activeConversation.listItem}
              context={activeConversation.context}
              messages={activeMessages}
              onSendMessage={(body) => {
                const result = sendMockRelationshipMessage(activeConversation.conversation, body)
                if (result.kind !== 'sent') return false

                window.location.reload()
                return true
              }}
            />
            <ConversationContextPanel context={activeConversation.context} />
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
