import { arrivals, needsAction, stayTimeline, todayMetrics } from '../../data/mock/today'
import { PageHeader } from '../shell/page-header'
import { ArrivalsList } from './arrivals-list'
import { MetricCard } from './metric-card'
import { NeedsAction } from './needs-action'
import { StayTimeline } from './stay-timeline'

export function TodayPage() {
  return (
    <div>
      <PageHeader title="Today" subtitle="Wednesday, May 14, 2025" />

      <section aria-label="Hotel overview" className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {todayMetrics.map((metric) => <MetricCard key={metric.label} metric={metric} />)}
      </section>

      <div className="mt-3 grid items-stretch gap-3 xl:grid-cols-[1.55fr_0.95fr_1.9fr]">
        <div className="h-full"><ArrivalsList arrivals={arrivals} /></div>
        <div className="h-full"><NeedsAction items={needsAction} /></div>
        <div className="h-full"><StayTimeline items={stayTimeline} /></div>
      </div>
    </div>
  )
}
