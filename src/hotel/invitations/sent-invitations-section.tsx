import { useState } from 'react'
import { Button } from '../../components/ui/button'
import { campaignInvitations } from '../../data/mock/campaign-invitations'
import { getCreator } from '../../data/mock/creators'
import { CreatorAvatar } from '../../entities/creator/creator-avatar'
import type { CampaignInvitationStatus, HotelCampaignInvitation } from '../../entities/campaign-invitation/campaign-invitation.types'
import { cancelMockCampaignInvitation } from './campaign-invitation-cancel-action'
import { getMockCampaignInvitations } from './campaign-invitation-storage'

const statusLabels: Record<CampaignInvitationStatus, string> = {
  PENDING: 'Pending',
  ACCEPTED: 'Accepted',
  DECLINED: 'Declined',
  CANCELLED: 'Cancelled',
  EXPIRED: 'Expired',
}

function readCampaignInvitations(campaignId: string) {
  return getMockCampaignInvitations(campaignInvitations).filter(
    (invitation) => invitation.campaignId === campaignId,
  )
}

export function SentInvitationsSection({ campaignId }: Readonly<{ campaignId: string }>) {
  const [invitations, setInvitations] = useState<ReadonlyArray<HotelCampaignInvitation>>(
    () => readCampaignInvitations(campaignId),
  )

  if (invitations.length === 0) return null

  function cancelInvitation(invitationId: string) {
    const result = cancelMockCampaignInvitation(invitationId)
    setInvitations((current) =>
      current.map((invitation) =>
        invitation.id === invitationId ? result.invitation : invitation,
      ),
    )
  }

  return (
    <section
      className="mx-auto mt-6 w-full max-w-[1180px] border-t border-partout-border pb-10 pt-6"
      aria-labelledby="sent-invitations-title"
    >
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <p className="text-[7px] font-medium uppercase tracking-[0.16em] text-partout-text-muted">Participation</p>
          <h2 id="sent-invitations-title" className="mt-1 font-display text-[23px] font-normal tracking-[-0.02em] text-partout-text">
            Sent invitations
          </h2>
        </div>
        <span className="text-[8px] text-partout-text-muted">
          {invitations.length} {invitations.length === 1 ? 'invitation' : 'invitations'}
        </span>
      </div>

      <div className="divide-y divide-partout-border border-y border-partout-border">
        {invitations.map((invitation) => {
          const creator = getCreator(invitation.creatorId)
          const creatorName = creator?.name ?? 'Creator not modeled'
          const initials = creator?.initials ?? '—'

          return (
            <div
              key={invitation.id}
              className="grid gap-3 py-3 sm:grid-cols-[32px_minmax(0,1fr)_90px_auto] sm:items-center"
            >
              <CreatorAvatar name={creatorName} initials={initials} size="small" className="size-8 rounded-full text-[7px]" />
              <div className="min-w-0">
                <p className="truncate text-[9px] font-medium text-partout-text">{creatorName}</p>
                <p className="mt-0.5 text-[7px] text-partout-text-muted">
                  {invitation.respondBy ? `Respond by ${invitation.respondBy}` : 'Response deadline not modeled'}
                </p>
              </div>
              <span className="text-[8px] font-medium text-partout-text-muted">
                {statusLabels[invitation.status]}
              </span>
              {invitation.status === 'PENDING' ? (
                <Button
                  variant="secondary"
                  className="h-8 px-3 text-[8px]"
                  onClick={() => cancelInvitation(invitation.id)}
                >
                  Cancel invitation
                </Button>
              ) : (
                <span className="text-right text-[7px] text-partout-text-muted">Closed</span>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
