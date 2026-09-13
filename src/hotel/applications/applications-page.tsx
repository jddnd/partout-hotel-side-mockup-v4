import { applications } from '../../data/mock/applications'
import { getCreator } from '../../data/mock/creators'
import { PageHeader } from '../shell/page-header'
import { approveMockApplication } from './application-approval-action'
import { ApplicationCard } from './application-card'
import { ApplicationsToolbar } from './applications-toolbar'
import type { ShortlistCreator } from './applications.types'
import { ShortlistPanel } from './shortlist-panel'

export function ApplicationsPage() {
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

  return (
    <div>
      <PageHeader title="Applications" />
      <ApplicationsToolbar />

      <div className="mt-3 grid items-start gap-3 xl:grid-cols-[minmax(0,1fr)_280px]">
        <section aria-label="Applications" className="space-y-2">
          {candidates.map(({ application, creator }) => (
            <ApplicationCard
              key={application.id}
              application={application}
              creator={creator}
              onAccept={() => approveMockApplication(application.id)}
            />
          ))}
        </section>
        <ShortlistPanel creators={shortlist} />
      </div>
    </div>
  )
}
