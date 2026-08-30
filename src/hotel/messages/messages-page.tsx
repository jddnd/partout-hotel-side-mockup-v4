import { activeConversationContext, activeConversationMessages, conversations } from '../../data/mock/messages'
import { ConversationContextPanel } from './conversation-context'
import { ConversationList } from './conversation-list'
import { ConversationThread } from './conversation-thread'
import { MessagesTabs } from './messages-tabs'

export function MessagesPage() {
  const activeConversation = conversations[0]

  return (
    <div>
      <h1 className="font-display text-[32px] font-normal leading-none tracking-[-0.03em] text-partout-text">Messages</h1>
      <MessagesTabs />

      <div className="mt-3 grid items-start gap-3 xl:grid-cols-[300px_minmax(0,1fr)_270px]">
        <ConversationList conversations={conversations} />
        <ConversationThread conversation={activeConversation} messages={activeConversationMessages} />
        <ConversationContextPanel context={activeConversationContext} />
      </div>
    </div>
  )
}
