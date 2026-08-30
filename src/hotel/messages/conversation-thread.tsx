import { MoreHorizontal, Paperclip, Phone, Send, Video } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { CreatorAvatar } from '../../entities/creator/creator-avatar'
import type { ChatMessage, HotelConversation } from './messages.types'

export function ConversationThread({
  conversation,
  messages,
}: Readonly<{
  conversation: HotelConversation
  messages: ReadonlyArray<ChatMessage>
}>) {
  return (
    <section className="flex min-h-[560px] min-w-0 flex-col overflow-hidden rounded-card border border-partout-border bg-partout-surface shadow-card" aria-label={`Conversation with ${conversation.creatorName}`}>
      <header className="flex items-center justify-between gap-4 border-b border-partout-border px-4 py-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <CreatorAvatar name={conversation.creatorName} initials={conversation.initials} size="small" className="rounded-full" />
          <div className="min-w-0">
            <h2 className="truncate text-[10px] font-medium text-partout-text">{conversation.creatorName}</h2>
            <p className="mt-0.5 truncate text-[7px] text-partout-text-muted">{conversation.status} · {conversation.campaign}</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <HeaderAction label="Call"><Phone aria-hidden="true" size={12} strokeWidth={1.6} /></HeaderAction>
          <HeaderAction label="Video"><Video aria-hidden="true" size={13} strokeWidth={1.6} /></HeaderAction>
          <HeaderAction label="More actions"><MoreHorizontal aria-hidden="true" size={13} strokeWidth={1.6} /></HeaderAction>
        </div>
      </header>

      <div className="flex-1 space-y-3 overflow-y-auto bg-partout-canvas/35 px-4 py-4">
        <p className="text-center text-[6px] text-partout-text-muted">Today</p>
        {messages.map((message) => (
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
        ))}
      </div>

      <form className="border-t border-partout-border bg-partout-surface p-3" onSubmit={(event) => event.preventDefault()}>
        <div className="flex items-end gap-2 rounded-card border border-partout-border bg-partout-canvas px-2.5 py-2">
          <button type="button" aria-label="Attach file" className="grid size-7 shrink-0 place-items-center rounded-control text-partout-text-muted hover:bg-partout-muted hover:text-partout-text">
            <Paperclip aria-hidden="true" size={12} strokeWidth={1.6} />
          </button>
          <label className="min-w-0 flex-1">
            <span className="sr-only">Message Sofie Larsen</span>
            <textarea rows={1} placeholder="Write a message…" className="max-h-24 min-h-7 w-full resize-none bg-transparent py-1.5 text-[8px] leading-4 text-partout-text outline-none placeholder:text-partout-text-muted" />
          </label>
          <Button type="submit" className="h-8 gap-1.5 px-3 text-[8px]">
            Send
            <Send aria-hidden="true" size={10} strokeWidth={1.7} />
          </Button>
        </div>
      </form>
    </section>
  )
}

function HeaderAction({ label, children }: Readonly<{ label: string; children: React.ReactNode }>) {
  return (
    <button type="button" aria-label={label} className="grid size-7 place-items-center rounded-control text-partout-text-muted transition-colors hover:bg-partout-muted hover:text-partout-text">
      {children}
    </button>
  )
}
