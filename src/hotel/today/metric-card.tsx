import { cn } from '../../lib/cn'
import type { TodayMetric } from './today.types'

export function MetricCard({ metric }: Readonly<{ metric: TodayMetric }>) {
  const Icon = metric.icon

  return (
    <article className="min-h-[104px] rounded-card border border-partout-border bg-partout-surface p-4 shadow-card">
      <div className="flex min-h-[70px] items-center gap-3">
        <div className={cn('grid size-10 shrink-0 place-items-center text-partout-forest', metric.iconTone === 'warm' && 'text-partout-warm')}>
          <Icon aria-hidden="true" size={25} strokeWidth={1.5} />
        </div>
        <div className="min-w-0">
          <p className="text-[10px] font-medium leading-none text-partout-text-muted">{metric.label}</p>
          <p className="mt-1.5 text-[23px] font-medium leading-none tracking-[-0.025em] text-partout-text">{metric.value}</p>
          <p className="mt-1.5 text-[9px] leading-none text-partout-text-muted">{metric.detail}</p>
        </div>
      </div>
    </article>
  )
}
