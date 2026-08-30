import { campaignTabs } from '../../data/mock/campaigns'

export function CampaignsTabs() {
  return (
    <div className="mt-3 flex items-center gap-1 border-b border-partout-border" role="tablist" aria-label="Campaign status">
      {campaignTabs.map((tab) => (
        <button
          key={tab.label}
          type="button"
          role="tab"
          aria-selected={tab.active === true}
          className={`relative flex h-9 items-center gap-1.5 px-3 text-[8px] font-medium transition-colors ${
            tab.active
              ? 'text-partout-text after:absolute after:inset-x-2 after:bottom-[-1px] after:h-px after:bg-partout-action'
              : 'text-partout-text-muted hover:text-partout-text'
          }`}
        >
          <span>{tab.label}</span>
          <span className={`text-[7px] ${tab.active ? 'text-partout-action' : 'text-partout-text-muted'}`}>{tab.count}</span>
        </button>
      ))}
    </div>
  )
}
