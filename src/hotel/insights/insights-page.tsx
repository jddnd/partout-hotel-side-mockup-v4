import {
  audienceAges,
  audienceByCreator,
  audienceCountries,
  audienceGenders,
  audienceObservations,
  bookingCampaigns,
  bookingMetrics,
  bookingObservations,
  campaignObservations,
  campaignPerformance,
  contentFormats,
  contentObservations,
  insightMetrics,
  insightObservations,
  topCampaigns,
  topContent,
  topTalent,
} from '../../data/mock/insights'
import { AudienceInsightCard } from './audience-insight-card'
import { ContentPerformanceCard } from './content-performance-card'
import { exportMockInsightsCsv } from './insights-export'
import { InsightMetrics } from './insight-metrics'
import { InsightObservations } from './insight-observations'
import { InsightsHeader } from './insights-header'
import { InsightsTabs } from './insights-tabs'
import type { InsightsView } from './insights.types'
import { RankedInsightsCard } from './ranked-insights-card'

export function InsightsPage({
  activeView = 'overview',
  onViewChange = () => undefined,
}: Readonly<{
  activeView?: InsightsView
  onViewChange?: (view: InsightsView) => void
}>) {
  return (
    <div>
      <InsightsHeader onExport={exportMockInsightsCsv} />
      <InsightsTabs activeView={activeView} onChange={onViewChange} />

      <div role="tabpanel" aria-label={`${activeView} insights`}>
        {activeView === 'overview' ? <OverviewView onViewChange={onViewChange} /> : null}
        {activeView === 'audience' ? <AudienceView /> : null}
        {activeView === 'campaigns' ? <CampaignsView /> : null}
        {activeView === 'content' ? <ContentView /> : null}
        {activeView === 'bookings' ? <BookingsView /> : null}
      </div>
    </div>
  )
}

function OverviewView({ onViewChange }: Readonly<{ onViewChange: (view: InsightsView) => void }>) {
  return (
    <>
      <InsightMetrics metrics={insightMetrics} />

      <div className="mt-3 grid gap-3 xl:grid-cols-[minmax(0,1.4fr)_minmax(300px,0.8fr)]">
        <AudienceInsightCard
          countries={audienceCountries}
          ages={audienceAges}
          genders={audienceGenders}
          onViewAudience={() => onViewChange('audience')}
        />
        <RankedInsightsCard title="Top campaigns" items={topCampaigns} onViewAll={() => onViewChange('campaigns')} />
      </div>

      <div className="mt-3 grid gap-3 xl:grid-cols-[0.8fr_1.15fr_1.15fr]">
        <RankedInsightsCard title="Top talent" items={topTalent} onViewAll={() => onViewChange('audience')} />
        <ContentPerformanceCard formats={contentFormats} onViewContent={() => onViewChange('content')} />
        <InsightObservations observations={insightObservations} />
      </div>
    </>
  )
}

function AudienceView() {
  return (
    <>
      <div className="mt-3">
        <AudienceInsightCard countries={audienceCountries} ages={audienceAges} genders={audienceGenders} />
      </div>
      <div className="mt-3 grid gap-3 xl:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)]">
        <RankedInsightsCard title="Audience by creator" items={audienceByCreator} />
        <InsightObservations observations={audienceObservations} />
      </div>
    </>
  )
}

function CampaignsView() {
  return (
    <>
      <div className="mt-3">
        <RankedInsightsCard title="Campaign performance" items={campaignPerformance} />
      </div>
      <div className="mt-3 grid gap-3 xl:grid-cols-[minmax(0,1.15fr)_minmax(300px,0.85fr)]">
        <ContentPerformanceCard formats={contentFormats} />
        <InsightObservations observations={campaignObservations} />
      </div>
    </>
  )
}

function ContentView() {
  return (
    <>
      <div className="mt-3">
        <ContentPerformanceCard formats={contentFormats} />
      </div>
      <div className="mt-3 grid gap-3 xl:grid-cols-[minmax(0,1.15fr)_minmax(300px,0.85fr)]">
        <RankedInsightsCard title="Top content" items={topContent} />
        <InsightObservations observations={contentObservations} />
      </div>
    </>
  )
}

function BookingsView() {
  return (
    <>
      <InsightMetrics metrics={bookingMetrics} />
      <div className="mt-3 grid gap-3 xl:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)]">
        <RankedInsightsCard title="Bookings by campaign" items={bookingCampaigns} />
        <InsightObservations observations={bookingObservations} />
      </div>
      <p className="mt-3 rounded-card border border-partout-border bg-partout-surface px-4 py-3 text-[7px] leading-4 text-partout-text-muted shadow-card">
        Attribution preview — this mockup shows the approved Hotel experience with prototype data. Real Partout still needs the hotel-side booking attribution integration before these figures can become live.
      </p>
    </>
  )
}
