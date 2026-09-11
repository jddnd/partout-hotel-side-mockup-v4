import { Send } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { CreatorAvatar } from '../../entities/creator/creator-avatar'
import type { ChatMessage, ConversationContext, HotelConversation } from './messages.types'

export function ConversationThread({
  conversation,
  context,
  messages,
}: Readonly<{
  conversation: HotelConversation
  context: ConversationContext
  messages: ReadonlyArray<ChatMessage>
}>) {
  return (
    <section className="flex min-h-[560px] min-w-0 flex-col overflow-hidden rounded-card border border-partout-border bg-partout-surface shadow-card" aria-label={`Conversation with ${conversation.creatorName}`}>
      <header className="flex items-center justify-between gap-4 border-b border-partout-border px-4 py-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <CreatorAvatar name={conversation.creatorName} initials={conversation.initials} size="small" className="rounded-full" />
          <div className="min-w-0">
            <h2 className="truncate text-[10px] font-medium text-partout-text">{conversation.creatorName}</h2>
            <p className="mt-0.5 truncate text-[7px] font-medium text-partout-text-muted">{conversation.relationshipLabel}</p>
            <p className="mt-0.5 truncate text-[7px] text-partout-text-muted">One continuous conversation with your property</p>
          </div>
        </div>

        {context.stayId ? (
          <a
            href={`/hotel/stays/${context.stayId}`}
            className="shrink-0 text-[8px] font-medium text-partout-action transition-colors hover:text-partout-action-hover"
          >
            View current stay
          </a>
        ) : (
          <span className="shrink-0 rounded-full bg-partout-muted px-2 py-1 text-[7px] font-medium text-partout-text-muted">
            {context.currentContext}
          </span>
        )}
      </header>

      <div className="flex-1 space-y-3 overflow-y-auto bg-partout-canvas/35 px-4 py-4">
        <p className="text-center text-[6px] text-partout-text-muted">Latest conversation</p>
        {messages.length ? messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === 'hotel' ? 'justify-end' : 'justify-start'}`}>
            <div className="max-w-[76%]">
              <div className={`rounded-[8px] px-3 py-2.5 text-[8px] leading-[1.45] ${
                message.sender === 'hotel'
                  ? 'bg-partout-forest text-white'
                  : 'border border-partout-border bg-partout-surface text-partout-text'
              }`}>
                {message.body}
              </div>
              <p className={`mt-1 text-[6px] text-partout-text-muted ${message.sender === 'hotel' ? 'text-right' : ''}`}>{message.timestamp}</p>
            </div>
          </div>
        )) : (
          <div className="mx-auto max-w-[300px] py-12 text-center">
            <p className="font-display text-[18px] font-normal text-partout-text">Start the conversation</p>
            <p className="mt-2 text-[8px] leading-4 text-partout-text-muted">Anything written here belongs to the relationship, not only this campaign.</p>
          </div>
        )}
      </div>

      <form className="border-t border-partout-border bg-partout-surface p-3" onSubmit={(event) => event.preventDefault()}>
        <div className="flex items-end gap-2 rounded-card border border-partout-border bg-partout-canvas px-2.5 py-2">
          <label className="min-w-0 flex-1">
            <span className="sr-only">Message {conversation.creatorName}</span>
            <textarea rows={1} placeholder={`Message ${conversation.creatorName.split(' ')[0]}…`} className="max-h-24 min-h-7 w-full resize-none bg-transparent px-1 py-1.5 text-[8px] leading-4 text-partout-text outline-none placeholder:text-partout-text-muted" />
          </label>
          <Button type="submit" className="h-8 gap-1.5 px-3 text-[8px]">
            Send
            <Send aria-hidden="true" size={10} strokeWidth={1.7} />
          </Button>
        </div>
        <p className="mt-2 px-1 text-[6px] text-partout-text-muted">This conversation stays with the creator relationship across future campaigns and stays.</p>
      </form>
    </section>
  )
}
