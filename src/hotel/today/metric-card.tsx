import { cn } from '../../lib/cn'
import type { TodayMetric } from './today.types'

export function MetricCard({ metric }: Readonly<{ metric: TodayMetric }>) {
  const Icon = metric.icon

  return (
    <article className="h-full rounded-card border border-partout-border bg-partout-surface p-4 shadow-card">
      <div className="flex min-h-16 items-center gap-3">
        <div className={cn('grid size-9 shrink-0 place-items-center text-partout-forest', metric.iconTone === 'warm' && 'text-partout-warm')}>
          <Icon aria-hidden="true" size={22} strokeWidth={1.55} />
        </div>
        <div className="min-w-0">
          <p className="text-[10px] font-medium leading-none text-partout-text-muted">{metric.label}</p>
          <p className="mt-1.5 text-[21px] font-medium leading-none tracking-[-0.025em] text-partout-text">{metric.value}</p>
          <p className="mt-1.5 text-[9px] leading-none text-partout-text-muted">{metric.detail}</p>
        </div>
      </div>
    </article>
  )
}
