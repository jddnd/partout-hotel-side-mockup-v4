import {
  campaignContributions,
  contentFormats,
  creatorContributions,
  insightDelivery,
  insightMetrics,
  insightObservations,
} from '../../data/mock/insights'
import { ContentPerformanceCard } from './content-performance-card'
import { InsightMetrics } from './insight-metrics'
import { InsightObservations } from './insight-observations'
import { InsightsHeader } from './insights-header'
import { InsightsTabs } from './insights-tabs'
import { RankedInsightsCard } from './ranked-insights-card'

export function InsightsPage() {
  return (
    <div className="mx-auto w-full max-w-[1120px] pb-12">
      <InsightsHeader />
      <InsightsTabs />
      <InsightMetrics metrics={insightMetrics} />

      <div className="mt-7 grid gap-4 xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] xl:items-stretch">
        <section className="flex min-h-[210px] flex-col justify-between border-y border-partout-border py-5" aria-labelledby="delivered-title">
          <div>
            <p className="text-[7px] font-medium uppercase tracking-[0.16em] text-partout-text-muted">Delivered</p>
            <h2 id="delivered-title" className="mt-2 font-display text-[34px] font-normal leading-[1.05] tracking-[-0.035em] text-partout-text">
              {insightDelivery.publishedContent} pieces published
            </h2>
            <p className="mt-3 max-w-[360px] text-[8px] leading-4 text-partout-text-muted">
              The work behind the measured activity this period — across creators, campaigns and stays.
            </p>
          </div>

          <dl className="mt-6 grid grid-cols-2 gap-5 border-t border-partout-border pt-4">
            <DeliveryFact label="Hosted stays" value={insightDelivery.stays} />
            <DeliveryFact label="Campaigns" value={insightDelivery.campaigns} />
          </dl>
        </section>

        <InsightObservations observations={insightObservations} />
      </div>

      <div className="mt-8">
        <RankedInsightsCard title="Campaign contribution" items={campaignContributions} />
      </div>

      <div className="mt-8 grid gap-8 xl:grid-cols-2 xl:items-start">
        <RankedInsightsCard id="creators" title="Creators behind the work" items={creatorContributions} />
        <ContentPerformanceCard formats={contentFormats} />
      </div>

      <aside className="mt-8 border-t border-partout-border pt-4" aria-label="Measurement note">
        <p className="max-w-[760px] text-[7px] leading-4 text-partout-text-muted">
          This view deliberately separates measured activity from estimates. Booking attribution, EMV, comparison deltas and engagement rates should only appear when Partout has a reliable source and methodology for them.
        </p>
      </aside>
    </div>
  )
}

function DeliveryFact({ label, value }: Readonly<{ label: string; value: number }>) {
  return (
    <div>
      <dt className="text-[7px] text-partout-text-muted">{label}</dt>
      <dd className="mt-1 font-display text-[25px] font-normal leading-none text-partout-text">{value}</dd>
    </div>
  )
}
