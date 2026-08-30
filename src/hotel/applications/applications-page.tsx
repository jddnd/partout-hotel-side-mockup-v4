import { applications, shortlist } from '../../data/mock/applications'
import { PageHeader } from '../shell/page-header'
import { ApplicationCard } from './application-card'
import { ApplicationsToolbar } from './applications-toolbar'
import { ShortlistPanel } from './shortlist-panel'

export function ApplicationsPage() {
  return (
    <div>
      <PageHeader title="Applications" />
      <ApplicationsToolbar />

      <div className="mt-3 grid items-start gap-3 xl:grid-cols-[minmax(0,1fr)_280px]">
        <section aria-label="Applications" className="space-y-2">
          {applications.map((application) => <ApplicationCard key={application.id} application={application} />)}
        </section>
        <ShortlistPanel creators={shortlist} />
      </div>
    </div>
  )
}
