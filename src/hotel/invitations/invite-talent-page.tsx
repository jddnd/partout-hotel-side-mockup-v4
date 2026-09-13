import { useMemo, useState } from 'react'
import { campaigns } from '../../data/mock/campaigns'
import { creators } from '../../data/mock/creators'
import { Button } from '../../components/ui/button'
import { getMockCampaigns } from '../campaigns/campaign-mock-storage'
import { inviteTalentToCampaign, type CampaignInviteActionResult } from './campaign-invitation-action'

export function InviteTalentPage() {
  const availableCampaigns = useMemo(() => getMockCampaigns(campaigns), [])
  const [creatorId, setCreatorId] = useState(creators[0]?.id ?? '')
  const [campaignId, setCampaignId] = useState(availableCampaigns[0]?.id ?? '')
  const [result, setResult] = useState<CampaignInviteActionResult | null>(null)

  const creator = creators.find((candidate) => candidate.id === creatorId)
  const campaign = availableCampaigns.find((candidate) => candidate.id === campaignId)

  function submitInvitation() {
    if (!creatorId || !campaignId) return
    setResult(inviteTalentToCampaign({ creatorId, campaignId }))
  }

  return (
    <div className="mx-auto w-full max-w-[760px] pb-12 pt-9">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <a href="/hotel" className="text-[9px] font-medium text-partout-action transition-colors hover:text-partout-action-hover">
          ‹ Back to Today
        </a>
        <p className="text-[7px] font-medium uppercase tracking-[0.17em] text-partout-text-muted">Campaign invitation</p>
      </div>

      <section className="mt-5 rounded-card border border-partout-border bg-partout-surface p-6 shadow-card">
        <p className="text-[7px] font-medium uppercase tracking-[0.16em] text-partout-text-muted">Invite talent</p>
        <h1 className="mt-2 font-display text-[32px] font-normal leading-none tracking-[-0.035em] text-partout-text">
          Invite a creator to a campaign
        </h1>
        <p className="mt-3 max-w-[560px] text-[9px] leading-5 text-partout-text-muted">
          The invitation starts as pending. A collaboration starts only if the creator accepts.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-[8px] font-medium text-partout-text">Creator</span>
            <select
              value={creatorId}
              onChange={(event) => {
                setCreatorId(event.target.value)
                setResult(null)
              }}
              className="mt-2 h-10 w-full rounded-control border border-partout-border bg-partout-surface px-3 text-[9px] text-partout-text outline-none transition-colors focus:border-partout-action"
            >
              {creators.map((candidate) => (
                <option key={candidate.id} value={candidate.id}>
                  {candidate.name}{candidate.location ? ` · ${candidate.location}` : ''}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-[8px] font-medium text-partout-text">Campaign</span>
            <select
              value={campaignId}
              onChange={(event) => {
                setCampaignId(event.target.value)
                setResult(null)
              }}
              className="mt-2 h-10 w-full rounded-control border border-partout-border bg-partout-surface px-3 text-[9px] text-partout-text outline-none transition-colors focus:border-partout-action"
            >
              {availableCampaigns.map((candidate) => (
                <option key={candidate.id} value={candidate.id}>
                  {candidate.name} · {candidate.status}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-partout-border pt-5">
          <Button onClick={submitInvitation} disabled={!creator || !campaign} className="h-9 px-4 text-[9px]">
            Send invitation
          </Button>
          <p className="text-[8px] text-partout-text-muted">
            {creator && campaign ? `${creator.name} · ${campaign.name}` : 'Choose a creator and campaign'}
          </p>
        </div>

        {result ? <InvitationResult result={result} /> : null}
      </section>
    </div>
  )
}

function InvitationResult({ result }: Readonly<{ result: CampaignInviteActionResult }>) {
  const text = (() => {
    if (result.kind === 'created') return 'Invitation sent. Waiting for the creator to respond.'
    if (result.kind === 'already-pending') return 'This invitation is already pending. No duplicate invitation was created.'
    if (result.reason === 'application-already-exists') return 'This creator already has an application for this campaign.'
    if (result.reason === 'campaign-not-accepting-participation') return 'This campaign is not accepting participation.'
    return 'A closed invitation already exists for this creator and campaign.'
  })()

  return (
    <div className="mt-5 rounded-control border border-partout-border bg-partout-muted px-4 py-3" role="status">
      <p className="text-[8px] font-medium text-partout-text">{text}</p>
      {result.kind !== 'conflict' ? (
        <p className="mt-1 text-[7px] text-partout-text-muted">
          Status · {result.invitation.status}{result.invitation.respondBy ? ` · Respond by ${result.invitation.respondBy}` : ' · Response deadline not modeled'}
        </p>
      ) : null}
    </div>
  )
}
