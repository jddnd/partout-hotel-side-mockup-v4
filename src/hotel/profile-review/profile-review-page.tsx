import { MoreHorizontal } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { applications } from '../../data/mock/applications'
import { creatorProfileReviews } from '../../data/mock/profile-review'
import { CreatorPortrait } from '../../entities/creator/creator-portrait'
import { AudienceOverview } from './audience-overview'
import { ProfileReviewSidePanel } from './profile-review-side-panel'
import { RecentCollaborations } from './recent-collaborations'

export function ProfileReviewPage({ creatorId }: Readonly<{ creatorId: string }>) {
  const application = applications.find((candidate) => candidate.id === creatorId)
  const profile = creatorProfileReviews.find((candidate) => candidate.creatorId === creatorId)

  if (!application || !profile) {
    return (
      <main className="px-8 py-6">
        <a href="/hotel/applications" className="text-[9px] font-medium text-partout-action hover:text-partout-action-hover">
          ‹ Back to applications
        </a>
        <p className="mt-6 text-sm text-partout-text-muted">This profile review is not available in the owner-reference mock data.</p>
      </main>
    )
  }

  return (
    <main className="min-h-full px-8 pb-8 pt-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <a href="/hotel/applications" className="text-[9px] font-medium text-partout-action transition-colors hover:text-partout-action-hover">
          ‹ Back to applications
        </a>

        <div className="flex items-center gap-2" aria-label="Application decisions">
          <Button className="h-8 min-w-[92px] px-4 text-[9px]">Accept</Button>
          <Button variant="secondary" className="h-8 min-w-[92px] px-4 text-[9px]">Hold</Button>
          <Button variant="secondary" className="h-8 min-w-[92px] px-4 text-[9px]">Decline</Button>
          <button
            type="button"
            aria-label={`More actions for ${application.name}`}
            className="grid size-8 place-items-center rounded-control border border-partout-border bg-partout-surface text-partout-text-muted transition-colors hover:bg-partout-muted hover:text-partout-text"
          >
            <MoreHorizontal aria-hidden="true" size={14} strokeWidth={1.7} />
          </button>
        </div>
      </div>

      <div className="mt-3 grid gap-3 xl:grid-cols-[264px_minmax(0,1fr)_350px]">
        <CreatorGallery name={application.name} />

        <article className="overflow-hidden rounded-card border border-partout-border bg-partout-surface shadow-card">
          <header className="p-4">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-display text-[22px] font-normal leading-none tracking-[-0.02em]">{application.name}</h1>
              <span className="rounded-full border border-partout-border bg-partout-success-soft px-2 py-1 text-[7px] font-medium text-partout-success-text">
                {application.fitScore} Fit score
              </span>
            </div>
            <p className="mt-2 text-[8px] text-partout-text-muted">{application.location}</p>
            <p className="mt-1.5 max-w-[560px] text-[8px] leading-4 text-partout-text-muted">{profile.bio}</p>

            <dl className="mt-4 grid grid-cols-2 gap-y-4 sm:grid-cols-4">
              <CreatorMetric label="Followers" value={application.followers} />
              <CreatorMetric label="Engagement rate" value={application.engagementRate} />
              <CreatorMetric label="Audience quality" value={application.audienceQuality} />
              <CreatorMetric label="Fit score" value={application.fitScore} />
            </dl>
          </header>

          <AudienceOverview countries={profile.countries} ages={profile.ages} genders={profile.genders} />
          <RecentCollaborations collaborations={profile.recentCollaborations} />
        </article>

        <ProfileReviewSidePanel socialConnections={profile.socialConnections} previousStays={profile.previousStays} />
      </div>
    </main>
  )
}

function CreatorGallery({ name }: Readonly<{ name: string }>) {
  return (
    <section aria-label={`${name} portfolio preview`} className="self-start">
      <CreatorPortrait name={name} className="aspect-[4/5] w-full rounded-card border border-partout-border" />
      <div className="mt-2 grid grid-cols-5 gap-2">
        {Array.from({ length: 5 }, (_, index) => (
          <CreatorPortrait
            key={index}
            name={`${name}-${index + 1}`}
            className={`aspect-square w-full rounded-control border border-partout-border ${index === 0 ? 'ring-1 ring-partout-action ring-offset-1' : ''}`}
          />
        ))}
      </div>
    </section>
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
