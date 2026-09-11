import { ArrowLeft, CalendarDays, DoorOpen, MessageCircle } from 'lucide-react'
import { stays } from '../../data/mock/stays'
import { CreatorAvatar } from '../../entities/creator/creator-avatar'

export function StayWorkspacePage({ stayId }: Readonly<{ stayId: string }>) {
  const stay = stays.find((candidate) => candidate.id === stayId)

  if (!stay) {
    return (
      <div className="mx-auto max-w-xl py-20 text-center">
        <h1 className="font-display text-[32px] font-normal tracking-[-0.03em] text-partout-text">Collaboration not found</h1>
        <p className="mt-3 text-[10px] text-partout-text-muted">This stay is not available in the current mockup.</p>
        <a href="/hotel/stays" className="mt-5 inline-flex text-[9px] font-medium text-partout-action hover:underline">Back to Stays</a>
      </div>
    )
  }

  const progress = Math.round((stay.agreedContentCompleted / stay.agreedContentTotal) * 100)
  const remaining = Math.max(stay.agreedContentTotal - stay.agreedContentCompleted, 0)

  return (
    <div className="mx-auto w-full max-w-[1120px] pb-12">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <a href="/hotel/stays" className="inline-flex items-center gap-1.5 text-[8px] font-medium text-partout-text-muted transition-colors hover:text-partout-text">
          <ArrowLeft aria-hidden="true" size={11} strokeWidth={1.8} />
          Stays
        </a>
        <p className="text-[7px] font-medium uppercase tracking-[0.17em] text-partout-text-muted">Active collaboration</p>
      </div>

      <header className="mt-5 border-b border-partout-border pb-7">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="flex min-w-0 items-center gap-4">
            <CreatorAvatar name={stay.creatorName} initials={stay.initials} size="large" className="size-14 rounded-full" />
            <div className="min-w-0">
              <p className="text-[7px] font-medium uppercase tracking-[0.16em] text-partout-text-muted">Stay with</p>
              <h1 className="mt-1.5 font-display text-[38px] font-normal leading-none tracking-[-0.04em] text-partout-text">{stay.creatorName}</h1>
              <p className="mt-2 text-[8px] text-partout-text-muted">{stay.location} · {stay.dates}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex rounded-full bg-partout-success-soft px-2.5 py-1.5 text-[7px] font-medium text-partout-success-text">{stay.status}</span>
            <a href="/hotel/messages" className="inline-flex h-8 items-center gap-1.5 rounded-control bg-partout-action px-3.5 text-[8px] font-medium text-white transition-colors hover:bg-partout-action-hover">
              <MessageCircle aria-hidden="true" size={11} strokeWidth={1.7} />
              Message
            </a>
          </div>
        </div>
      </header>

      <div className="mt-7 grid gap-8 xl:grid-cols-[minmax(0,1fr)_292px] xl:items-start">
        <main className="min-w-0">
          <section className="border-b border-partout-border pb-7" aria-labelledby="next-title">
            <p className="text-[7px] font-medium uppercase tracking-[0.16em] text-partout-text-muted">Now</p>
            <h2 id="next-title" className="mt-1.5 font-display text-[25px] font-normal tracking-[-0.025em] text-partout-text">
              {stay.nextMoment ?? 'Everything is in place'}
            </h2>
            <p className="mt-2 max-w-[580px] text-[9px] leading-5 text-partout-text-muted">
              {stay.nextMoment ? 'The next shared moment for this stay.' : 'There is nothing the hotel needs to resolve right now.'}
            </p>
          </section>

          <section className="border-b border-partout-border py-7" aria-labelledby="stay-details-title">
            <div className="flex items-baseline justify-between gap-4">
              <h2 id="stay-details-title" className="font-display text-[23px] font-normal tracking-[-0.02em] text-partout-text">The stay</h2>
              <span className="text-[8px] text-partout-text-muted">{stay.dates}</span>
            </div>

            <dl className="mt-5 grid gap-5 sm:grid-cols-3">
              <StayDetail icon={<DoorOpen aria-hidden="true" size={12} strokeWidth={1.6} />} label="Room" value={stay.room} />
              <StayDetail icon={<CalendarDays aria-hidden="true" size={12} strokeWidth={1.6} />} label="Check-in" value={stay.checkIn} />
              <StayDetail icon={<CalendarDays aria-hidden="true" size={12} strokeWidth={1.6} />} label="Check-out" value={stay.checkOut} />
            </dl>
          </section>

          <section className="py-7" aria-labelledby="agreement-title">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[7px] font-medium uppercase tracking-[0.16em] text-partout-text-muted">Agreed together</p>
                <h2 id="agreement-title" className="mt-1.5 font-display text-[23px] font-normal tracking-[-0.02em] text-partout-text">Content from this stay</h2>
              </div>
              <span className="font-display text-[24px] font-normal leading-none text-partout-text">{progress}%</span>
            </div>

            <div className="mt-5 grid gap-5 border-y border-partout-border py-5 sm:grid-cols-3">
              <AgreementStat label="Agreed" value={`${stay.agreedContentTotal}`} />
              <AgreementStat label="Published" value={`${stay.agreedContentCompleted}`} />
              <AgreementStat label="Still to publish" value={`${remaining}`} />
            </div>

            <span className="mt-5 block h-1 overflow-hidden rounded-full bg-partout-muted" aria-hidden="true">
              <span className="block h-full rounded-full bg-partout-action" style={{ width: `${progress}%` }} />
            </span>
            <p className="mt-3 max-w-[590px] text-[8px] leading-4 text-partout-text-muted">
              Published content appears here as it goes live. This is shared progress, not an approval workflow.
            </p>
          </section>
        </main>

        <aside className="space-y-3 xl:sticky xl:top-8">
          <section className="rounded-card border border-partout-border bg-partout-surface p-5 shadow-card">
            <p className="text-[7px] font-medium uppercase tracking-[0.16em] text-partout-text-muted">Relationship</p>
            <h2 className="mt-2 font-display text-[22px] font-normal leading-none tracking-[-0.025em] text-partout-text">{stay.relationshipLabel}</h2>
            <p className="mt-3 text-[8px] leading-4 text-partout-text-muted">{stay.relationshipNote}</p>
            <a href={`/hotel/applications/${stay.id}`} className="mt-4 inline-flex text-[8px] font-medium text-partout-action hover:underline hover:underline-offset-2">View creator profile</a>
          </section>

          <section className="rounded-card border border-partout-border bg-partout-surface p-5 shadow-card">
            <p className="text-[7px] font-medium uppercase tracking-[0.16em] text-partout-text-muted">Campaign</p>
            <h2 className="mt-2 font-display text-[20px] font-normal leading-none tracking-[-0.02em] text-partout-text">{stay.campaign}</h2>
            <p className="mt-2 text-[8px] leading-4 text-partout-text-muted">This stay came from the campaign decision. The collaboration now continues here and in Messages.</p>
            <a href={`/hotel/campaigns/${stay.campaignId}`} className="mt-4 inline-flex text-[8px] font-medium text-partout-action hover:underline hover:underline-offset-2">View campaign</a>
          </section>

          <section className="rounded-card border border-partout-border bg-partout-canvas p-5">
            <p className="text-[7px] font-medium uppercase tracking-[0.16em] text-partout-text-muted">After the stay</p>
            <p className="mt-2 text-[8px] leading-4 text-partout-text-muted">The conversation and collaboration history stay connected to {stay.creatorName} for the next time you want to work together.</p>
          </section>
        </aside>
      </div>
    </div>
  )
}

function StayDetail({ icon, label, value }: Readonly<{ icon: React.ReactNode; label: string; value: string }>) {
  return (
    <div>
      <dt className="flex items-center gap-1.5 text-[7px] uppercase tracking-[0.12em] text-partout-text-muted">{icon}{label}</dt>
      <dd className="mt-2 text-[9px] font-medium text-partout-text">{value}</dd>
    </div>
  )
}

function AgreementStat({ label, value }: Readonly<{ label: string; value: string }>) {
  return (
    <div>
      <dt className="text-[7px] text-partout-text-muted">{label}</dt>
      <dd className="mt-1 font-display text-[24px] font-normal leading-none text-partout-text">{value}</dd>
    </div>
  )
}
