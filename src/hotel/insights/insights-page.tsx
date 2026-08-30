import {
  audienceAges,
  audienceCountries,
  audienceGenders,
  contentFormats,
  insightMetrics,
  insightObservations,
  topCampaigns,
  topTalent,
} from '../../data/mock/insights'
import { AudienceInsightCard } from './audience-insight-card'
import { ContentPerformanceCard } from './content-performance-card'
import { InsightMetrics } from './insight-metrics'
import { InsightObservations } from './insight-observations'
import { InsightsHeader } from './insights-header'
import { InsightsTabs } from './insights-tabs'
import { RankedInsightsCard } from './ranked-insights-card'

export function InsightsPage() {
  return (
    <div>
      <InsightsHeader />
      <InsightsTabs />
      <InsightMetrics metrics={insightMetrics} />

      <div className="mt-3 grid gap-3 xl:grid-cols-[minmax(0,1.4fr)_minmax(300px,0.8fr)]">
        <AudienceInsightCard countries={audienceCountries} ages={audienceAges} genders={audienceGenders} />
        <RankedInsightsCard title="Top campaigns" items={topCampaigns} />
      </div>

      <div className="mt-3 grid gap-3 xl:grid-cols-[0.8fr_1.15fr_1.15fr]">
        <RankedInsightsCard title="Top talent" items={topTalent} />
        <ContentPerformanceCard formats={contentFormats} />
        <InsightObservations observations={insightObservations} />
      </div>
    </div>
  )
}
