type InsightsTab = Readonly<{
  label: string
  active: boolean
}>

const tabs: ReadonlyArray<InsightsTab> = [
  { label: 'Overview', active: true },
  { label: 'Audience', active: false },
  { label: 'Campaigns', active: false },
  { label: 'Content', active: false },
  { label: 'Bookings', active: false },
]

export function InsightsTabs() {
  return (
    <div className="mt-3 flex items-center gap-1" role="tablist" aria-label="Insight views">
      {tabs.map((tab) => (
        <button
          key={tab.label}
          type="button"
          role="tab"
          aria-selected={tab.active}
          className={`flex h-7 items-center rounded-control px-2.5 text-[8px] font-medium transition-colors ${
            tab.active
              ? 'bg-partout-action text-white hover:bg-partout-action-hover'
              : 'text-partout-text-muted hover:bg-partout-muted hover:text-partout-text'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
