import type { TodayMetric } from './today.types'

export function MetricCard({ metric }: Readonly<{ metric: TodayMetric }>) {
  const Icon = metric.icon

  return (
    <article className="rounded-card border border-partout-border bg-partout-surface p-4 shadow-card">
      <div className="flex items-start gap-3">
        <div className="grid size-8 shrink-0 place-items-center rounded-full border border-partout-border bg-partout-muted text-partout-action">
          <Icon aria-hidden="true" size={15} strokeWidth={1.7} />
        </div>
        <div className="min-w-0">
          <p className="text-[10px] font-medium text-partout-text-muted">{metric.label}</p>
          <p className="mt-1 text-[22px] font-medium leading-none tracking-[-0.025em] text-partout-text">{metric.value}</p>
          <p className="mt-2 text-[10px] text-partout-text-muted">{metric.detail}</p>
        </div>
      </div>
    </article>
  )
}
