import { PageHeader } from './page-header'

export function HotelPlaceholderPage({ title }: Readonly<{ title: string }>) {
  return (
    <div>
      <PageHeader title={title} />
      <section className="mt-6 rounded-card border border-dashed border-partout-border bg-partout-surface p-8 text-sm text-partout-text-muted">
        This route is intentionally scaffolded but not designed yet. It will inherit the approved Hotel shell and design tokens.
      </section>
    </div>
  )
}
