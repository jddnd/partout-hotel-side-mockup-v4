import { useEffect, useState } from 'react'
import { applications } from '../../data/mock/applications'
import { getCreator } from '../../data/mock/creators'
import { PageHeader } from '../shell/page-header'
import { approveMockApplication } from './application-approval-action'
import { ApplicationCard } from './application-card'
import { readApplicationHoldReceipts } from './application-decision-storage'
import { declineMockApplication } from './application-decline-action'
import {
  canHoldMockApplication,
  toggleMockApplicationHold,
} from './application-hold-action'
import { ApplicationsToolbar } from './applications-toolbar'
import type { ShortlistCreator } from './applications.types'
import { ShortlistPanel } from './shortlist-panel'

export function ApplicationsPage() {
  const [heldApplicationIds, setHeldApplicationIds] = useState<ReadonlySet<string>>(new Set())

  useEffect(() => {
    setHeldApplicationIds(new Set(readApplicationHoldReceipts().map((receipt) => receipt.applicationId)))
  }, [])

  const candidates = applications.flatMap((application) => {
    const creator = getCreator(application.creatorId)
    return creator ? [{ application, creator }] : []
  })

  const shortlist: ShortlistCreator[] = candidates.map(({ application, creator }) => ({
    id: creator.id,
    name: creator.name,
    location: creator.location ?? 'Location not modeled',
    fitScore: application.fitScore,
  }))

  function removeHeldState(applicationId: string) {
    setHeldApplicationIds((current) => {
      const next = new Set(current)
      next.delete(applicationId)
      return next
    })
  }

  function handleHold(applicationId: string) {
    const result = toggleMockApplicationHold(applicationId)
    if (result.kind === 'conflict') return

    setHeldApplicationIds((current) => {
      const next = new Set(current)
      if (result.kind === 'held') next.add(applicationId)
      else next.delete(applicationId)
      return next
    })
  }

  function handleAccept(applicationId: string) {
    approveMockApplication(applicationId)
    removeHeldState(applicationId)
  }

  function handleDecline(applicationId: string) {
    declineMockApplication(applicationId)
    removeHeldState(applicationId)
  }

  return (
    <div>
      <PageHeader title="Applications" />
      <ApplicationsToolbar />

      <div className="mt-3 grid items-start gap-3 xl:grid-cols-[minmax(0,1fr)_280px]">
        <section aria-label="Applications" className="space-y-2">
          {candidates.map(({ application, creator }) => {
            const holdable = canHoldMockApplication(application.id)

            return (
              <ApplicationCard
                key={application.id}
                application={application}
                creator={creator}
                onAccept={() => handleAccept(application.id)}
                onHold={() => handleHold(application.id)}
                onDecline={() => handleDecline(application.id)}
                holdActive={heldApplicationIds.has(application.id)}
                holdDisabled={!holdable}
              />
            )
          })}
        </section>
        <ShortlistPanel creators={shortlist} />
      </div>
    </div>
  )
}
