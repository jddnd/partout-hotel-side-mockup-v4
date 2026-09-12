import { ChevronDown } from 'lucide-react'

type ApplicationTab = Readonly<{
  label: string
  count?: number
  active: boolean
}>

const tabs: readonly ApplicationTab[] = [
  { label: 'All applications', count: 12, active: true },
  { label: 'New', count: 4, active: false },
  { label: 'Reviewed', count: 5, active: false },
  { label: 'Shortlisted', count: 3, active: false },
  { label: 'Declined', active: false },
]

export function ApplicationsToolbar() {
  return (
    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-b border-partout-border pb-3">
      <div role="tablist" aria-label="Application status" className="flex flex-wrap items-center gap-1.5">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            type="button"
            role="tab"
            aria-selected={tab.active}
            className={tab.active
              ? 'inline-flex h-8 items-center gap-1.5 rounded-control bg-partout-action px-3 text-[9px] font-medium text-white'
              : 'inline-flex h-8 items-center gap-1.5 rounded-control px-3 text-[9px] font-medium text-partout-text-muted transition-colors hover:bg-partout-muted hover:text-partout-text'}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined ? <span className={tab.active ? 'text-white/75' : 'text-partout-text-muted'}>{tab.count}</span> : null}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <FilterButton label="All platforms" />
        <FilterButton label="Sort: Newest" />
      </div>
    </div>
  )
}

function FilterButton({ label }: Readonly<{ label: string }>) {
  return (
    <button type="button" className="inline-flex h-8 min-w-[112px] items-center justify-between gap-3 rounded-control border border-partout-border bg-partout-surface px-3 text-[9px] text-partout-text-muted transition-colors hover:bg-partout-muted hover:text-partout-text">
      <span>{label}</span>
      <ChevronDown aria-hidden="true" size={11} strokeWidth={1.7} />
    </button>
  )
}
