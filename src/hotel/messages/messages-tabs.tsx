import type { MessageView } from './messages.types'

export function MessagesTabs({
  view,
  totalCount,
  unreadCount,
}: Readonly<{
  view: MessageView
  totalCount: number
  unreadCount: number
}>) {
  const tabs = [
    { label: 'All', count: totalCount, value: 'all' as const },
    { label: 'Unread', count: unreadCount, value: 'unread' as const },
  ]

  return (
    <div className="mt-3 flex items-center gap-1" role="tablist" aria-label="Message views">
      {tabs.map((tab) => {
        const active = view === tab.value
        return (
          <a
            key={tab.value}
            href={tab.value === 'all' ? '/hotel/messages' : '/hotel/messages?view=unread'}
            role="tab"
            aria-selected={active}
            className={`flex h-7 items-center gap-1.5 rounded-control px-2.5 text-[8px] font-medium transition-colors ${
              active
                ? 'bg-partout-action text-white hover:bg-partout-action-hover'
                : 'text-partout-text-muted hover:bg-partout-muted hover:text-partout-text'
            }`}
          >
            <span>{tab.label}</span>
            <span className={`text-[7px] ${active ? 'text-white/72' : 'text-partout-text-muted'}`}>{tab.count}</span>
          </a>
        )
      })}
    </div>
  )
}
