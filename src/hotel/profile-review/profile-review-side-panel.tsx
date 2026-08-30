import { ChevronRight, ExternalLink } from 'lucide-react'
import type { PreviousStay, SocialConnection, SocialPlatform } from './profile-review.types'

const platformGlyphs: Record<SocialPlatform, string> = {
  Instagram: '◎',
  TikTok: '♪',
  YouTube: '▶',
}

export function ProfileReviewSidePanel({
  socialConnections,
  previousStays,
}: Readonly<{
  socialConnections: ReadonlyArray<SocialConnection>
  previousStays: ReadonlyArray<PreviousStay>
}>) {
  return (
    <aside className="self-start overflow-hidden rounded-card border border-partout-border bg-partout-surface shadow-card">
      <section className="p-4" aria-labelledby="social-connections-title">
        <h2 id="social-connections-title" className="text-[10px] font-medium text-partout-text">
          Social connections
        </h2>

        <div className="mt-2 divide-y divide-partout-border">
          {socialConnections.map((connection) => (
            <div key={connection.platform} className="grid grid-cols-[28px_minmax(0,1fr)_auto_14px] items-center gap-2 py-3 first:pt-1.5">
              <span className="grid size-7 place-items-center rounded-control border border-partout-border bg-partout-muted text-[12px] font-medium text-partout-action">
                {platformGlyphs[connection.platform]}
              </span>
              <div className="min-w-0">
                <p className="text-[9px] font-medium text-partout-text">{connection.platform}</p>
                <p className="mt-0.5 truncate text-[7px] text-partout-text-muted">{connection.handle}</p>
              </div>
              <p className="whitespace-nowrap text-[8px] text-partout-text-muted">{connection.audience}</p>
              <ExternalLink aria-hidden="true" size={11} strokeWidth={1.6} className="text-partout-text-muted" />
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-partout-border p-4" aria-labelledby="previous-stays-title">
        <div className="flex items-center justify-between gap-3">
          <h2 id="previous-stays-title" className="text-[10px] font-medium text-partout-text">
            Previous stays with us
          </h2>
          <span className="text-[8px] text-partout-text-muted">{previousStays.length} stays</span>
        </div>

        <div className="mt-2 divide-y divide-partout-border">
          {previousStays.map((stay, index) => (
            <div key={`${stay.month}-${stay.title}`} className="grid grid-cols-[48px_minmax(0,1fr)_14px] items-center gap-2 py-2.5">
              <span className={`hotel-cover-placeholder block h-8 rounded-control border border-partout-border ${index % 2 === 1 ? 'opacity-80' : ''}`} />
              <div className="min-w-0">
                <p className="text-[8px] text-partout-text-muted">{stay.month}</p>
                <p className="mt-0.5 truncate text-[8px] font-medium text-partout-text">{stay.title}</p>
              </div>
              <ChevronRight aria-hidden="true" size={11} strokeWidth={1.6} className="text-partout-text-muted" />
            </div>
          ))}
        </div>

        <button type="button" className="mt-2 text-[8px] font-medium text-partout-action transition-colors hover:text-partout-action-hover">
          View full history
        </button>
      </section>
    </aside>
  )
}
