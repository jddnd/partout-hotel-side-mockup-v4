import { applications } from '../../data/mock/applications'
import { getCreator } from '../../data/mock/creators'
import { creatorProfileReviews } from '../../data/mock/profile-review'
import { CreatorPortrait } from '../../entities/creator/creator-portrait'
import { approveMockApplication } from '../applications/application-approval-action'
import { AudienceOverview } from './audience-overview'
import { ProfileReviewSidePanel } from './profile-review-side-panel'
import { RecentCollaborations } from './recent-collaborations'

export function ProfileReviewPage({ creatorId }: Readonly<{ creatorId: string }>) {
  const creator = getCreator(creatorId)
  const application = applications.find((candidate) => candidate.creatorId === creatorId)
  const profile = creatorProfileReviews.find((candidate) => candidate.creatorId === creatorId)

  if (!creator || !application || !profile) {
    return (
      <div className="pt-9">
        <a href="/hotel/applications" className="text-[9px] font-medium text-partout-action hover:text-partout-action-hover">
          ‹ Back to applications
        </a>
        <p className="mt-6 text-sm text-partout-text-muted">This application review is not available in the owner-reference mock data.</p>
      </div>
    )
  }

  return (
    <div className="min-h-full pb-10 pt-9">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <a href="/hotel/applications" className="text-[9px] font-medium text-partout-action transition-colors hover:text-partout-action-hover">
          ‹ Back to applications
        </a>
        <p className="text-[7px] font-medium uppercase tracking-[0.17em] text-partout-text-muted">Application review</p>
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-[264px_minmax(0,1fr)_310px] xl:items-start">
        <CreatorGallery name={creator.name} />

        <main className="min-w-0 overflow-hidden rounded-card border border-partout-border bg-partout-surface shadow-card">
          <header className="p-6 pb-5">
            <p className="text-[7px] font-medium uppercase tracking-[0.16em] text-partout-text-muted">Creator</p>
            <h1 className="mt-2 font-display text-[32px] font-normal leading-none tracking-[-0.035em] text-partout-text">{creator.name}</h1>
            <p className="mt-2 text-[8px] text-partout-text-muted">{creator.location ?? 'Location not modeled'}</p>
            <p className="mt-4 max-w-[620px] text-[10px] leading-5 text-partout-text-muted">{profile.bio}</p>
          </header>

          <section className="border-y border-partout-border px-6 py-6" aria-labelledby="why-this-stay-title">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div>
                <p className="text-[7px] font-medium uppercase tracking-[0.16em] text-partout-text-muted">Why this stay</p>
                <h2 id="why-this-stay-title" className="mt-1.5 font-display text-[22px] font-normal tracking-[-0.025em] text-partout-text">
                  {application.campaignName}
                </h2>
              </div>
              <p className="text-[8px] text-partout-text-muted">Prefers {application.requestedDates}</p>
            </div>
            <p className="mt-4 max-w-[650px] font-display text-[18px] font-normal leading-[1.4] tracking-[-0.015em] text-partout-text">
              “{application.pitch}”
            </p>
          </section>

          <section className="px-6 py-5" aria-labelledby="supporting-signals-title">
            <div className="flex items-baseline justify-between gap-4">
              <h2 id="supporting-signals-title" className="text-[9px] font-medium text-partout-text">Supporting signals</h2>
              <p className="text-[7px] text-partout-text-muted">Evidence, not the decision.</p>
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-y-4 sm:grid-cols-4">
              <CreatorMetric label="Followers" value={creator.followers ?? '—'} />
              <CreatorMetric label="Engagement" value={creator.engagementRate ?? '—'} />
              <CreatorMetric label="Audience quality" value={creator.audienceQuality ?? '—'} />
              <CreatorMetric label="Fit" value={application.fitScore} />
            </dl>
          </section>

          <AudienceOverview countries={profile.countries} ages={profile.ages} genders={profile.genders} />
          <RecentCollaborations collaborations={profile.recentCollaborations} />
        </main>

        <ProfileReviewSidePanel
          creatorId={creator.id}
          creatorName={creator.name}
          application={application}
          socialConnections={profile.socialConnections}
          previousStays={profile.previousStays}
          onAccept={() => approveMockApplication(application.id)}
        />
      </div>
    </div>
  )
}

function CreatorGallery({ name }: Readonly<{ name: string }>) {
  return (
    <section aria-label={`${name} portfolio preview`} className="self-start xl:sticky xl:top-8">
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
      <p className="mt-3 text-[7px] leading-4 text-partout-text-muted">A quick visual read of their work before the audience and relationship detail.</p>
    </section>
  )
}

function CreatorMetric({ label, value }: Readonly<{ label: string; value: string }>) {
  return (
    <div>
      <dt className="text-[7px] text-partout-text-muted">{label}</dt>
      <dd className="mt-1 text-[13px] font-medium leading-none tracking-[-0.015em] text-partout-text">{value}</dd>
    </div>
  )
}
