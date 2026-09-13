import { ChevronRight, ExternalLink, MessageSquare } from 'lucide-react'
import { Button } from '../../components/ui/button'
import type { CreatorApplicationContext, PreviousStay, SocialConnection, SocialPlatform } from './profile-review.types'

const platformGlyphs: Record<SocialPlatform, string> = {
  Instagram: '◎',
  TikTok: '♪',
  YouTube: '▶',
}

export function ProfileReviewSidePanel({
  creatorId,
  creatorName,
  application,
  socialConnections,
  previousStays,
  onAccept,
}: Readonly<{
  creatorId: string
  creatorName: string
  application: CreatorApplicationContext
  socialConnections: ReadonlyArray<SocialConnection>
  previousStays: ReadonlyArray<PreviousStay>
  onAccept?: () => void
}>) {
  return (
    <aside className="self-start space-y-3 xl:sticky xl:top-8">
      <section className="rounded-card border border-partout-border bg-partout-surface p-5 shadow-card" aria-labelledby="decision-title">
        <p className="text-[7px] font-medium uppercase tracking-[0.17em] text-partout-text-muted">Decision</p>
        <h2 id="decision-title" className="mt-2 font-display text-[22px] font-normal leading-none tracking-[-0.025em] text-partout-text">
          {application.campaignName}
        </h2>
        <p className="mt-2 text-[8px] text-partout-text-muted">Requested stay · {application.requestedDates}</p>

        <Button className="mt-5 h-9 w-full text-[9px]" onClick={onAccept}>Accept creator</Button>
        <a
          href={`/hotel/messages?creator=${encodeURIComponent(creatorId)}`}
          className="mt-2 inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-control border border-partout-border bg-partout-surface px-3 text-[9px] font-medium text-partout-text transition-colors hover:bg-partout-muted"
        >
          <MessageSquare aria-hidden="true" size={11} strokeWidth={1.7} />
          Message first
        </a>
        <button type="button" className="mt-3 w-full text-center text-[8px] font-medium text-partout-text-muted transition-colors hover:text-partout-text">
          Decline request
        </button>

        <p className="mt-4 border-t border-partout-border pt-4 text-[7px] leading-4 text-partout-text-muted">
          Accepting {creatorName.split(' ')[0]} starts the collaboration for this campaign. The relationship continues in Messages and the stay workspace.
        </p>
      </section>

      <section className="rounded-card border border-partout-border bg-partout-surface p-5 shadow-card" aria-labelledby="relationship-title">
        <div className="flex items-baseline justify-between gap-3">
          <div>
            <p className="text-[7px] font-medium uppercase tracking-[0.17em] text-partout-text-muted">Relationship</p>
            <h2 id="relationship-title" className="mt-1.5 font-display text-[19px] font-normal tracking-[-0.02em] text-partout-text">
              {previousStays.length > 0 ? 'You already know them' : 'A new connection'}
            </h2>
          </div>
          <span className="text-[8px] text-partout-text-muted">{previousStays.length} stays</span>
        </div>

        {previousStays.length > 0 ? (
          <div className="mt-3 divide-y divide-partout-border border-t border-partout-border">
            {previousStays.map((stay, index) => (
              <div key={`${stay.month}-${stay.title}`} className="grid grid-cols-[44px_minmax(0,1fr)_14px] items-center gap-2 py-3">
                <span className={`hotel-cover-placeholder block h-8 rounded-control border border-partout-border ${index % 2 === 1 ? 'opacity-80' : ''}`} />
                <div className="min-w-0">
                  <p className="text-[7px] text-partout-text-muted">{stay.month}</p>
                  <p className="mt-0.5 truncate text-[8px] font-medium text-partout-text">{stay.title}</p>
                </div>
                <ChevronRight aria-hidden="true" size={11} strokeWidth={1.6} className="text-partout-text-muted" />
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-3 text-[8px] leading-4 text-partout-text-muted">No previous stay with this property yet.</p>
        )}
      </section>

      <section className="rounded-card border border-partout-border bg-partout-surface p-5 shadow-card" aria-labelledby="social-connections-title">
        <h2 id="social-connections-title" className="text-[10px] font-medium text-partout-text">Social connections</h2>

        <div className="mt-3 divide-y divide-partout-border">
          {socialConnections.map((connection) => (
            <div key={connection.platform} className="grid grid-cols-[26px_minmax(0,1fr)_auto_12px] items-center gap-2 py-3 first:pt-1">
              <span className="grid size-6 place-items-center rounded-control border border-partout-border bg-partout-muted text-[10px] font-medium text-partout-action">
                {platformGlyphs[connection.platform]}
              </span>
              <div className="min-w-0">
                <p className="text-[8px] font-medium text-partout-text">{connection.platform}</p>
                <p className="mt-0.5 truncate text-[7px] text-partout-text-muted">{connection.handle}</p>
              </div>
              <p className="whitespace-nowrap text-[7px] text-partout-text-muted">{connection.audience}</p>
              <ExternalLink aria-hidden="true" size={10} strokeWidth={1.6} className="text-partout-text-muted" />
            </div>
          ))}
        </div>
      </section>
    </aside>
  )
}