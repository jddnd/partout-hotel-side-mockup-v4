import { Film, Image, Images, MoreHorizontal } from 'lucide-react'
import { CreatorAvatar } from '../../entities/creator/creator-avatar'
import type { CampaignStatus, HotelCampaign } from './campaigns.types'

const statusClasses: Record<CampaignStatus, string> = {
  Active: 'border-partout-success-soft bg-partout-success-soft text-partout-success-text',
  'Ending soon': 'border-[#efe5d9] bg-[#fbf5ed] text-partout-warm',
  Upcoming: 'border-[#dce6e8] bg-[#eef4f5] text-[#58777a]',
  Draft: 'border-partout-border bg-partout-muted text-partout-text-muted',
}

export function CampaignsTable({ campaigns }: Readonly<{ campaigns: ReadonlyArray<HotelCampaign> }>) {
  return (
    <div className="mt-3 overflow-hidden rounded-card border border-partout-border bg-partout-surface shadow-card">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1040px] table-fixed border-collapse">
          <thead>
            <tr className="border-b border-partout-border bg-partout-canvas/45 text-left">
              <HeaderCell className="w-[168px]">Campaign</HeaderCell>
              <HeaderCell className="w-[150px]">Hotel / Brand</HeaderCell>
              <HeaderCell className="w-[120px]">Dates</HeaderCell>
              <HeaderCell className="w-[88px]">Status</HeaderCell>
              <HeaderCell className="w-[92px]">Deliverables</HeaderCell>
              <HeaderCell className="w-[110px]">Talent</HeaderCell>
              <HeaderCell className="w-[82px]">Est. reach</HeaderCell>
              <HeaderCell className="w-[82px]">Est. EMV</HeaderCell>
              <HeaderCell className="w-[64px]">Bookings</HeaderCell>
              <HeaderCell className="w-[106px]">Progress</HeaderCell>
              <HeaderCell className="w-[28px]"><span className="sr-only">Actions</span></HeaderCell>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign, index) => (
              <CampaignRow key={campaign.id} campaign={campaign} index={index} />
            ))}
          </tbody>
        </table>
      </div>

      <footer className="border-t border-partout-border px-3 py-3 text-[7px] text-partout-text-muted">
        Showing 1–{campaigns.length} of {campaigns.length} campaigns
      </footer>
    </div>
  )
}

function CampaignRow({ campaign, index }: Readonly<{ campaign: HotelCampaign; index: number }>) {
  return (
    <tr className="border-b border-partout-border last:border-b-0 transition-colors hover:bg-partout-canvas/55">
      <Cell>
        <div className="flex items-center gap-2.5">
          <CampaignThumbnail name={campaign.name} index={index} />
          <div className="min-w-0">
            <p className="truncate text-[8px] font-semibold text-partout-text">{campaign.name}</p>
            <p className="mt-0.5 truncate text-[6px] text-partout-text-muted">{campaign.subtitle}</p>
          </div>
        </div>
      </Cell>
      <Cell className="truncate text-[7px] text-partout-text-muted">{campaign.hotel}</Cell>
      <Cell className="whitespace-nowrap text-[7px] text-partout-text-muted">{campaign.dates}</Cell>
      <Cell>
        <span className={`inline-flex rounded-full border px-2 py-1 text-[6px] font-medium ${statusClasses[campaign.status]}`}>
          {campaign.status}
        </span>
      </Cell>
      <Cell><Deliverables campaign={campaign} /></Cell>
      <Cell><Talent campaign={campaign} /></Cell>
      <Cell className="text-[8px] font-medium text-partout-text">{campaign.estimatedReach}</Cell>
      <Cell className="text-[8px] font-medium text-partout-text">{campaign.estimatedEmv}</Cell>
      <Cell className="text-center text-[8px] text-partout-text">{campaign.bookings}</Cell>
      <Cell><Progress value={campaign.progress} /></Cell>
      <Cell>
        <button type="button" aria-label={`More actions for ${campaign.name}`} className="grid size-6 place-items-center rounded-control text-partout-text-muted hover:bg-partout-muted hover:text-partout-text">
          <MoreHorizontal aria-hidden="true" size={12} strokeWidth={1.7} />
        </button>
      </Cell>
    </tr>
  )
}

function HeaderCell({ children, className = '' }: Readonly<{ children: React.ReactNode; className?: string }>) {
  return <th scope="col" className={`px-3 py-2.5 text-[6px] font-medium text-partout-text-muted ${className}`}>{children}</th>
}

function Cell({ children, className = '' }: Readonly<{ children: React.ReactNode; className?: string }>) {
  return <td className={`h-[58px] px-3 py-2 align-middle ${className}`}>{children}</td>
}

function CampaignThumbnail({ name, index }: Readonly<{ name: string; index: number }>) {
  const opacity = [1, 0.88, 0.76, 0.9, 0.7][index % 5]
  return (
    <span
      role="img"
      aria-label={`${name} cover placeholder`}
      className="hotel-cover-placeholder block size-9 shrink-0 rounded-control border border-partout-border"
      style={{ opacity }}
    />
  )
}

function Deliverables({ campaign }: Readonly<{ campaign: HotelCampaign }>) {
  return (
    <div className="flex items-center gap-2 text-[6px] text-partout-text-muted" aria-label={`${campaign.name} deliverables`}>
      <span className="flex items-center gap-0.5"><Film aria-hidden="true" size={9} strokeWidth={1.5} />{campaign.deliverables.reels}</span>
      <span className="flex items-center gap-0.5"><Images aria-hidden="true" size={9} strokeWidth={1.5} />{campaign.deliverables.stories}</span>
      <span className="flex items-center gap-0.5"><Image aria-hidden="true" size={9} strokeWidth={1.5} />{campaign.deliverables.posts}</span>
    </div>
  )
}

function Talent({ campaign }: Readonly<{ campaign: HotelCampaign }>) {
  const visible = campaign.talent.slice(0, 3)
  const overflow = Math.max(campaign.talent.length - visible.length, 0)

  return (
    <div className="flex items-center pl-1" aria-label={`${campaign.name} talent`}>
      {visible.map((creator, index) => (
        <CreatorAvatar
          key={creator.name}
          name={creator.name}
          initials={creator.initials}
          size="small"
          className={`size-5 rounded-full text-[5px] ${index > 0 ? '-ml-1.5' : ''}`}
        />
      ))}
      {overflow > 0 ? (
        <span className="-ml-1.5 grid size-5 place-items-center rounded-full border border-partout-border bg-partout-muted text-[5px] font-medium text-partout-text-muted">
          +{overflow}
        </span>
      ) : null}
    </div>
  )
}

function Progress({ value }: Readonly<{ value: number }>) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-6 text-right text-[7px] text-partout-text">{value}%</span>
      <span className="h-1 flex-1 overflow-hidden rounded-full bg-partout-muted" aria-hidden="true">
        <span className="block h-full rounded-full bg-partout-action" style={{ width: `${value}%` }} />
      </span>
    </div>
  )
}
