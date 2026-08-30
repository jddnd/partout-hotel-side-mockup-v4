import { MoreHorizontal } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { CreatorPortrait } from '../../entities/creator/creator-portrait'
import type { HotelApplication } from './applications.types'

export function ApplicationCard({ application }: Readonly<{ application: HotelApplication }>) {
  return (
    <article className="grid overflow-hidden rounded-card border border-partout-border bg-partout-surface shadow-card md:grid-cols-[150px_minmax(0,1fr)] xl:grid-cols-[176px_minmax(0,1fr)_142px]">
      <CreatorPortrait name={application.name} className="min-h-[176px] w-full md:h-full" />

      <div className="min-w-0 p-4">
        <div>
          <h2 className="font-display text-[21px] font-normal leading-none tracking-[-0.02em]">{application.name}</h2>
          <p className="mt-1.5 text-[9px] text-partout-text-muted">{application.location}</p>
        </div>

        <dl className="mt-4 grid grid-cols-2 gap-y-3 sm:grid-cols-4">
          <CreatorMetric label="Followers" value={application.followers} />
          <CreatorMetric label="Eng. rate" value={application.engagementRate} />
          <CreatorMetric label="Audience quality" value={application.audienceQuality} />
          <CreatorMetric label="Fit score" value={application.fitScore} />
        </dl>

        <div className="mt-4 grid gap-3 border-t border-partout-border pt-3 sm:grid-cols-3">
          <ApplicationContext label="Top audience" value={application.topAudience} detail={application.audienceShare} />
          <ApplicationContext label="Content focus" value={application.contentFocus} />
          <ApplicationContext label="Previous stays" value={application.previousStays} />
        </div>
      </div>

      <div className="flex gap-2 border-t border-partout-border p-4 md:col-span-2 xl:col-span-1 xl:flex-col xl:justify-center xl:border-l xl:border-t-0">
        <Button className="h-8 flex-1 px-3 text-[9px] xl:flex-none">Accept</Button>
        <Button variant="secondary" className="h-8 flex-1 px-3 text-[9px] xl:flex-none">Hold</Button>
        <div className="flex flex-1 gap-1 xl:flex-none">
          <Button variant="secondary" className="h-8 flex-1 px-3 text-[9px]">Decline</Button>
          <button type="button" aria-label={`More actions for ${application.name}`} className="grid size-8 shrink-0 place-items-center rounded-control border border-partout-border bg-partout-surface text-partout-text-muted transition-colors hover:bg-partout-muted hover:text-partout-text">
            <MoreHorizontal aria-hidden="true" size={14} strokeWidth={1.7} />
          </button>
        </div>
      </div>
    </article>
  )
}

function CreatorMetric({ label, value }: Readonly<{ label: string; value: string }>) {
  return (
    <div>
      <dt className="text-[8px] text-partout-text-muted">{label}</dt>
      <dd className="mt-1 text-[13px] font-medium leading-none tracking-[-0.015em]">{value}</dd>
    </div>
  )
}

function ApplicationContext({ label, value, detail }: Readonly<{ label: string; value: string; detail?: string }>) {
  return (
    <div className="min-w-0">
      <p className="text-[8px] text-partout-text-muted">{label}</p>
      <p className="mt-1 truncate text-[8px] font-medium text-partout-text">{value}</p>
      {detail ? <p className="mt-0.5 text-[8px] text-partout-text-muted">{detail}</p> : null}
    </div>
  )
}
