import { Link } from '@tanstack/react-router'
import { ArrowLeft, CalendarDays, MessageSquare } from 'lucide-react'
import { campaignDetails } from '../../data/mock/campaign-details'
import { campaigns } from '../../data/mock/campaigns'
import { conversations } from '../../data/mock/messages'
import { CreatorAvatar } from '../../entities/creator/creator-avatar'
import { getMockCampaignDetail, getMockCampaigns } from './campaign-mock-storage'
import { CampaignStatusBadge } from './campaign-status-badge'
import type { HotelCampaign } from './campaigns.types'

export function CampaignDetailPage({ campaignId }: Readonly<{ campaignId: string }>) {
  const campaign = getMockCampaigns(campaigns).find((item) => item.id === campaignId)
  const detail = campaignDetails[campaignId] ?? getMockCampaignDetail(campaignId)

  if (campaign?.id === 'heritage-history' && !detail) {
    return <HeritageCampaignDetail campaign={campaign} />
  }

  if (!campaign || !detail) {
    return (
      <div className="mx-auto max-w-xl py-20 text-center">
        <h1 className="font-display text-[32px] font-normal tracking-[-0.03em] text-partout-text">Campaign not found</h1>
        <p className="mt-3 text-[10px] text-partout-text-muted">This campaign is not available in the current mockup.</p>
        <Link to="/hotel/campaigns" className="mt-5 inline-flex text-[9px] font-medium text-partout-action hover:underline">
          Back to Campaigns
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-[1180px]">
      <Link
        to="/hotel/campaigns"
        className="mb-5 inline-flex items-center gap-1.5 text-[8px] font-medium text-partout-text-muted hover:text-partout-text"
      >
        <ArrowLeft aria-hidden="true" size={11} strokeWidth={1.8} />
        Campaigns
      </Link>

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_230px] xl:items-start">
        <main className="min-w-0">
          <header className="border-b border-partout-border pb-6">
            <div className="flex flex-wrap items-start justify-between gap-5">
              <div className="min-w-0">
                <p className="text-[7px] font-medium uppercase tracking-[0.16em] text-partout-text-muted">Campaign</p>
                <h1 className="mt-2 font-display text-[36px] font-normal leading-none tracking-[-0.035em] text-partout-text">
                  {campaign.name}
                </h1>
                <p className="mt-2 text-[9px] text-partout-text-muted">{campaign.subtitle} · {campaign.dates}</p>
              </div>
              <div className="flex items-center gap-3">
                <CampaignStatusBadge status={campaign.status} />
                <a href="/hotel/insights?view=campaigns" className="text-[8px] font-medium text-partout-action hover:underline hover:underline-offset-2">
                  View insights
                </a>
              </div>
            </div>
          </header>

          {detail.pendingCreators.length > 0 ? (
            <section className="border-b border-partout-border py-6" aria-labelledby="campaign-attention-title">
              <div className="mb-4">
                <p className="text-[7px] font-medium uppercase tracking-[0.16em] text-partout-text-muted">Needs attention</p>
                <h2 id="campaign-attention-title" className="mt-1 font-display text-[23px] font-normal tracking-[-0.02em] text-partout-text">
                  {detail.pendingCreators.length === 1 ? '1 request waiting' : `${detail.pendingCreators.length} requests waiting`}
                </h2>
              </div>

              <div className="space-y-2">
                {detail.pendingCreators.map((creator) => (
                  <article key={creator.id} className="grid gap-3 rounded-card border border-partout-border bg-partout-surface px-4 py-3 shadow-card sm:grid-cols-[36px_minmax(0,1fr)_auto] sm:items-center">
                    <CreatorAvatar name={creator.name} initials={creator.initials} size="small" className="size-9 rounded-full text-[8px]" />
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                        <p className="text-[10px] font-semibold text-partout-text">{creator.name}</p>
                        <span className="text-[7px] text-partout-text-muted">{creator.location}</span>
                      </div>
                      <p className="mt-1 text-[7px] text-partout-text-muted">{creator.audience} · prefers {creator.preferredDates}</p>
                    </div>
                    <Link
                      to="/hotel/applications/$creatorId"
                      params={{ creatorId: creator.id }}
                      className="text-[8px] font-medium text-partout-action hover:underline hover:underline-offset-2"
                    >
                      Review creator
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          <section className="border-b border-partout-border py-6" aria-labelledby="campaign-people-title">
            <div className="mb-4 flex items-baseline justify-between gap-4">
              <h2 id="campaign-people-title" className="font-display text-[23px] font-normal tracking-[-0.02em] text-partout-text">People</h2>
              <span className="text-[8px] text-partout-text-muted">{detail.confirmedCreators.length} confirmed</span>
            </div>

            <div className="divide-y divide-partout-border border-y border-partout-border">
              {detail.confirmedCreators.map((creator) => {
                const conversation = conversations.find((candidate) => candidate.creatorName === creator.name)
                return (
                  <div key={`${creator.name}-${creator.dates}`} className="grid gap-3 py-3 sm:grid-cols-[32px_minmax(0,1fr)_auto] sm:items-center">
                    <CreatorAvatar name={creator.name} initials={creator.initials} size="small" className="size-8 rounded-full text-[7px]" />
                    <div>
                      <p className="text-[9px] font-medium text-partout-text">{creator.name}</p>
                      <p className="mt-0.5 text-[7px] text-partout-text-muted">{creator.dates} · Confirmed</p>
                    </div>
                    <a
                      href={conversation ? `/hotel/messages?creator=${encodeURIComponent(conversation.id)}` : '/hotel/messages'}
                      className="inline-flex items-center gap-1 text-[8px] font-medium text-partout-text-muted hover:text-partout-text"
                    >
                      <MessageSquare aria-hidden="true" size={10} strokeWidth={1.7} />
                      Message
                    </a>
                  </div>
                )
              })}
            </div>
          </section>

          <section className="border-b border-partout-border py-6" aria-labelledby="campaign-terms-title">
            <h2 id="campaign-terms-title" className="font-display text-[23px] font-normal tracking-[-0.02em] text-partout-text">Terms</h2>
            <dl className="mt-5 grid gap-6 md:grid-cols-3">
              <Term label="Agreed content" value={detail.agreedContent} />
              <Term label="Exchange" value={detail.exchange} />
              <Term label="Usage rights" value={detail.usageRights} />
            </dl>
          </section>

          <section className="py-6" aria-labelledby="campaign-stay-title">
            <div className="mb-4">
              <h2 id="campaign-stay-title" className="font-display text-[23px] font-normal tracking-[-0.02em] text-partout-text">Stay</h2>
              <p className="mt-1 text-[8px] text-partout-text-muted">Availability for this campaign.</p>
            </div>

            <div className="divide-y divide-partout-border border-y border-partout-border">
              {detail.stayWindows.map((window) => (
                <div key={window.label} className="grid gap-2 py-3 sm:grid-cols-[minmax(0,1fr)_90px_70px] sm:items-center">
                  <div className="flex items-center gap-2">
                    <CalendarDays aria-hidden="true" size={12} strokeWidth={1.6} className="text-partout-text-muted" />
                    <span className="text-[9px] font-medium text-partout-text">{window.label}</span>
                  </div>
                  <span className="text-[8px] tabular-nums text-partout-text-muted">{window.filled}/{window.total} filled</span>
                  <span className="text-right text-[7px] font-medium text-partout-text-muted">{window.status}</span>
                </div>
              ))}
            </div>
          </section>
        </main>

        <aside className="space-y-3 xl:sticky xl:top-8">
          <section className="rounded-card border border-partout-border bg-partout-surface p-4 shadow-card">
            <p className="text-[7px] font-medium uppercase tracking-[0.16em] text-partout-text-muted">Status</p>
            <dl className="mt-4 space-y-3">
              <StatusLine label="Applied" value={`${detail.pendingCreators.length + detail.confirmedCount}`} />
              <StatusLine label="Awaiting review" value={`${detail.pendingCreators.length}`} />
              <StatusLine label="Confirmed" value={`${detail.confirmedCount}/${detail.selectionLimit}`} />
              <StatusLine label="Open until" value={detail.openUntil} />
            </dl>
          </section>

          <section className="rounded-card border border-partout-border bg-partout-surface p-4 shadow-card">
            <p className="text-[7px] font-medium uppercase tracking-[0.16em] text-partout-text-muted">Understand</p>
            <p className="mt-2 text-[8px] leading-4 text-partout-text-muted">
              Campaign performance continues in Insights after content is published.
            </p>
            <a href="/hotel/insights?view=campaigns" className="mt-3 inline-flex text-[8px] font-medium text-partout-action hover:underline hover:underline-offset-2">
              View insights
            </a>
          </section>
        </aside>
      </div>
    </div>
  )
}

function HeritageCampaignDetail({ campaign }: Readonly<{ campaign: HotelCampaign }>) {
  const agreedContent = `${campaign.deliverables.reels} Reels · ${campaign.deliverables.stories} Stories · ${campaign.deliverables.posts} Posts`

  return (
    <div className="mx-auto w-full max-w-[1180px]">
      <Link
        to="/hotel/campaigns"
        className="mb-5 inline-flex items-center gap-1.5 text-[8px] font-medium text-partout-text-muted hover:text-partout-text"
      >
        <ArrowLeft aria-hidden="true" size={11} strokeWidth={1.8} />
        Campaigns
      </Link>

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_230px] xl:items-start">
        <main className="min-w-0">
          <header className="border-b border-partout-border pb-6">
            <div className="flex flex-wrap items-start justify-between gap-5">
              <div className="min-w-0">
                <p className="text-[7px] font-medium uppercase tracking-[0.16em] text-partout-text-muted">Campaign</p>
                <h1 className="mt-2 font-display text-[36px] font-normal leading-none tracking-[-0.035em] text-partout-text">
                  {campaign.name}
                </h1>
                <p className="mt-2 text-[9px] text-partout-text-muted">{campaign.subtitle} · {campaign.dates}</p>
              </div>
              <div className="flex items-center gap-3">
                <CampaignStatusBadge status={campaign.status} />
                <a href="/hotel/insights?view=campaigns" className="text-[8px] font-medium text-partout-action hover:underline hover:underline-offset-2">
                  View insights
                </a>
              </div>
            </div>
          </header>

          <section className="border-b border-partout-border py-6" aria-labelledby="heritage-people-title">
            <div className="mb-4 flex items-baseline justify-between gap-4">
              <h2 id="heritage-people-title" className="font-display text-[23px] font-normal tracking-[-0.02em] text-partout-text">People</h2>
              <span className="text-[8px] text-partout-text-muted">{campaign.talent.length} campaign talent</span>
            </div>

            <div className="divide-y divide-partout-border border-y border-partout-border">
              {campaign.talent.map((creator) => {
                const conversation = conversations.find((candidate) => candidate.creatorName === creator.name)
                return (
                  <div key={creator.name} className="grid gap-3 py-3 sm:grid-cols-[32px_minmax(0,1fr)_auto] sm:items-center">
                    <CreatorAvatar name={creator.name} initials={creator.initials} size="small" className="size-8 rounded-full text-[7px]" />
                    <div>
                      <p className="text-[9px] font-medium text-partout-text">{creator.name}</p>
                      <p className="mt-0.5 text-[7px] text-partout-text-muted">Campaign talent</p>
                    </div>
                    <a
                      href={conversation ? `/hotel/messages?creator=${encodeURIComponent(conversation.id)}` : '/hotel/messages'}
                      className="inline-flex items-center gap-1 text-[8px] font-medium text-partout-text-muted hover:text-partout-text"
                    >
                      <MessageSquare aria-hidden="true" size={10} strokeWidth={1.7} />
                      Message
                    </a>
                  </div>
                )
              })}
            </div>
          </section>

          <section className="border-b border-partout-border py-6" aria-labelledby="heritage-terms-title">
            <h2 id="heritage-terms-title" className="font-display text-[23px] font-normal tracking-[-0.02em] text-partout-text">Terms</h2>
            <dl className="mt-5 grid gap-6 md:grid-cols-3">
              <Term label="Agreed content" value={agreedContent} />
              <Term label="Exchange" value="Not modeled in mockup" />
              <Term label="Usage rights" value="Not modeled in mockup" />
            </dl>
          </section>

          <section className="py-6" aria-labelledby="heritage-stay-title">
            <div className="mb-4">
              <h2 id="heritage-stay-title" className="font-display text-[23px] font-normal tracking-[-0.02em] text-partout-text">Stay</h2>
              <p className="mt-1 text-[8px] text-partout-text-muted">Availability for this campaign.</p>
            </div>
            <div className="border-y border-partout-border py-3 text-[8px] text-partout-text-muted">
              Stay-window detail is not modeled for this campaign yet.
            </div>
          </section>
        </main>

        <aside className="space-y-3 xl:sticky xl:top-8">
          <section className="rounded-card border border-partout-border bg-partout-surface p-4 shadow-card">
            <p className="text-[7px] font-medium uppercase tracking-[0.16em] text-partout-text-muted">Status</p>
            <dl className="mt-4 space-y-3">
              <StatusLine label="Campaign dates" value={campaign.dates} />
              <StatusLine label="Progress" value={`${campaign.progress}%`} />
              <StatusLine label="Applications" value="Not modeled" />
              <StatusLine label="Selection limit" value="Not modeled" />
            </dl>
          </section>

          <section className="rounded-card border border-partout-border bg-partout-surface p-4 shadow-card">
            <p className="text-[7px] font-medium uppercase tracking-[0.16em] text-partout-text-muted">Understand</p>
            <p className="mt-2 text-[8px] leading-4 text-partout-text-muted">
              Campaign performance continues in Insights after content is published.
            </p>
            <a href="/hotel/insights?view=campaigns" className="mt-3 inline-flex text-[8px] font-medium text-partout-action hover:underline hover:underline-offset-2">
              View insights
            </a>
          </section>
        </aside>
      </div>
    </div>
  )
}

function Term({ label, value }: Readonly<{ label: string; value: string }>) {
  return (
    <div>
      <dt className="text-[7px] font-medium uppercase tracking-[0.14em] text-partout-text-muted">{label}</dt>
      <dd className="mt-1.5 text-[9px] leading-4 text-partout-text">{value}</dd>
    </div>
  )
}

function StatusLine({ label, value }: Readonly<{ label: string; value: string }>) {
  return (
    <div className="flex items-baseline justify-between gap-3 text-[8px]">
      <dt className="text-partout-text-muted">{label}</dt>
      <dd className="text-right font-medium text-partout-text">{value}</dd>
    </div>
  )
}
