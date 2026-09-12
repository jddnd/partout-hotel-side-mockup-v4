import type { InsightsView } from './insights.types'

type InsightsTab = Readonly<{
  label: string
  value: InsightsView
}>

const tabs: ReadonlyArray<InsightsTab> = [
  { label: 'Overview', value: 'overview' },
  { label: 'Audience', value: 'audience' },
  { label: 'Campaigns', value: 'campaigns' },
  { label: 'Content', value: 'content' },
  { label: 'Bookings', value: 'bookings' },
]

export function InsightsTabs({
  activeView,
  onChange,
}: Readonly<{
  activeView: InsightsView
  onChange: (view: InsightsView) => void
}>) {
  return (
    <div className="mt-3 flex items-center gap-1" role="tablist" aria-label="Insight views">
      {tabs.map((tab) => {
        const active = tab.value === activeView
        return (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(tab.value)}
            className={`flex h-7 items-center rounded-control px-2.5 text-[8px] font-medium transition-colors ${
              active
                ? 'bg-partout-action text-white hover:bg-partout-action-hover'
                : 'text-partout-text-muted hover:bg-partout-muted hover:text-partout-text'
            }`}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
