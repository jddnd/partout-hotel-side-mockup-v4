import { campaignTabs } from '../../data/mock/campaigns'

export function CampaignsTabs() {
  return (
    <div className="mt-3 flex items-center gap-1" role="tablist" aria-label="Campaign status">
      {campaignTabs.map((tab) => (
        <button
          key={tab.label}
          type="button"
          role="tab"
          aria-selected={tab.active === true}
          className={`flex h-7 items-center gap-1.5 rounded-control px-2.5 text-[8px] font-medium transition-colors ${
            tab.active
              ? 'bg-partout-action text-white hover:bg-partout-action-hover'
              : 'text-partout-text-muted hover:bg-partout-muted hover:text-partout-text'
          }`}
        >
          <span>{tab.label}</span>
          <span className={`text-[7px] ${tab.active ? 'text-white/72' : 'text-partout-text-muted'}`}>{tab.count}</span>
        </button>
      ))}
    </div>
  )
}
