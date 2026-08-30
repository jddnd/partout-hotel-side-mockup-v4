import type { RecentCollaboration } from './profile-review.types'

export function RecentCollaborations({ collaborations }: Readonly<{ collaborations: ReadonlyArray<RecentCollaboration> }>) {
  return (
    <section className="border-t border-partout-border px-4 py-4" aria-labelledby="recent-collaborations-title">
      <div className="flex items-center justify-between gap-4">
        <h2 id="recent-collaborations-title" className="text-[10px] font-medium text-partout-text">
          Recent collaborations
        </h2>
        <button type="button" className="text-[8px] text-partout-text-muted transition-colors hover:text-partout-text">
          View all
        </button>
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        {collaborations.map((collaboration, index) => (
          <article key={collaboration.name} className="flex min-w-0 items-center gap-2">
            <span className={`hotel-cover-placeholder block size-9 shrink-0 rounded-control border border-partout-border ${index === 1 ? 'opacity-85' : index === 2 ? 'opacity-70' : ''}`} />
            <div className="min-w-0">
              <p className="truncate text-[8px] font-medium text-partout-text">{collaboration.name}</p>
              <p className="mt-0.5 text-[7px] text-partout-text-muted">{collaboration.date}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
