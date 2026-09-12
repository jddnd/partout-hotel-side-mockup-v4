import { MessageSquare } from 'lucide-react'
import { getCreator } from '../../data/mock/creators'
import { creatorProfileReviews } from '../../data/mock/profile-review'
import { stays } from '../../data/mock/stays'
import { CreatorPortrait } from '../../entities/creator/creator-portrait'
import { AudienceOverview } from '../profile-review/audience-overview'
import { RecentCollaborations } from '../profile-review/recent-collaborations'

export function CreatorProfilePage({ creatorId }: Readonly<{ creatorId: string }>) {
  const creator = getCreator(creatorId)

  if (!creator) {
    return (
      <div className="mx-auto max-w-xl py-20 text-center">
        <h1 className="font-display text-[32px] font-normal tracking-[-0.03em] text-partout-text">Creator not found</h1>
        <p className="mt-3 text-[10px] text-partout-text-muted">This creator is not available in the current mockup.</p>
        <a href="/hotel/stays" className="mt-5 inline-flex text-[9px] font-medium text-partout-action hover:underline">Back to Stays</a>
      </div>
    )
  }

  const profile = creatorProfileReviews.find((candidate) => candidate.creatorId === creator.id)
  const stay = stays.find((candidate) => candidate.creatorId === creator.id)
  const messageHref = creator.conversationId
    ? `/hotel/messages?creator=${encodeURIComponent(creator.conversationId)}`
    : '/hotel/messages'

  return (
    <div className="mx-auto w-full max-w-[1120px] pb-12 pt-9">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <a href="/hotel/stays" className="text-[9px] font-medium text-partout-action transition-colors hover:text-partout-action-hover">
          ‹ Back to stays
        </a>
        <p className="text-[7px] font-medium uppercase tracking-[0.17em] text-partout-text-muted">Creator profile</p>
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-[264px_minmax(0,1fr)_292px] xl:items-start">
        <CreatorGallery name={creator.name} />

        <main className="min-w-0 overflow-hidden rounded-card border border-partout-border bg-partout-surface shadow-card">
          <header className="p-6 pb-5">
            <p className="text-[7px] font-medium uppercase tracking-[0.16em] text-partout-text-muted">Creator</p>
            <h1 className="mt-2 font-display text-[32px] font-normal leading-none tracking-[-0.035em] text-partout-text">{creator.name}</h1>
            <p className="mt-2 text-[8px] text-partout-text-muted">{creator.location ?? 'Location not modeled'}</p>
            <p className="mt-4 max-w-[620px] text-[10px] leading-5 text-partout-text-muted">
              {profile?.bio ?? 'Detailed creator profile is not modeled in the current mock data yet.'}
            </p>
          </header>

          <section className="border-y border-partout-border px-6 py-5" aria-labelledby="creator-signals-title">
            <h2 id="creator-signals-title" className="text-[9px] font-medium text-partout-text">Creator signals</h2>
            <dl className="mt-4 grid grid-cols-2 gap-y-4 sm:grid-cols-4">
              <CreatorMetric label="Followers" value={creator.followers ?? '—'} />
              <CreatorMetric label="Engagement" value={creator.engagementRate ?? '—'} />
              <CreatorMetric label="Audience quality" value={creator.audienceQuality ?? '—'} />
              <CreatorMetric label="Content focus" value={creator.contentFocus ?? '—'} />
            </dl>
          </section>

          {profile ? (
            <>
              <AudienceOverview countries={profile.countries} ages={profile.ages} genders={profile.genders} />
              <RecentCollaborations collaborations={profile.recentCollaborations} />
            </>
          ) : (
            <section className="px-6 py-6">
              <p className="text-[8px] leading-4 text-partout-text-muted">Audience, social and collaboration detail is not modeled for this creator yet.</p>
            </section>
          )}
        </main>

        <aside className="space-y-3 xl:sticky xl:top-8">
          <section className="rounded-card border border-partout-border bg-partout-surface p-5 shadow-card">
            <p className="text-[7px] font-medium uppercase tracking-[0.17em] text-partout-text-muted">Relationship</p>
            <h2 className="mt-2 font-display text-[21px] font-normal leading-none tracking-[-0.025em] text-partout-text">
              {stay?.relationshipLabel ?? 'Creator relationship'}
            </h2>
            <p className="mt-3 text-[8px] leading-4 text-partout-text-muted">
              {stay?.relationshipNote ?? 'Relationship history is not modeled for this creator yet.'}
            </p>
            <a href={messageHref} className="mt-4 inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-control bg-partout-action px-3 text-[9px] font-medium text-white transition-colors hover:bg-partout-action-hover">
              <MessageSquare aria-hidden="true" size={11} strokeWidth={1.7} />
              Message
            </a>
          </section>

          {profile ? (
            <section className="rounded-card border border-partout-border bg-partout-surface p-5 shadow-card">
              <p className="text-[7px] font-medium uppercase tracking-[0.17em] text-partout-text-muted">Social connections</p>
              <div className="mt-3 space-y-3">
                {profile.socialConnections.map((connection) => (
                  <div key={`${connection.platform}-${connection.handle}`}>
                    <p className="text-[8px] font-medium text-partout-text">{connection.platform} · {connection.handle}</p>
                    <p className="mt-0.5 text-[7px] text-partout-text-muted">{connection.audience}</p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}
        </aside>
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
