import { ArrowLeft } from 'lucide-react'
import { PageHeader } from '../shell/page-header'

export function SettingsDetailHeader({
  title,
  subtitle,
}: Readonly<{ title: string; subtitle: string }>) {
  return (
    <div>
      <a
        href="/hotel/settings"
        className="inline-flex items-center gap-1.5 text-[8px] font-medium text-partout-text-muted transition-colors hover:text-partout-text"
      >
        <ArrowLeft aria-hidden="true" size={11} strokeWidth={1.7} />
        Settings
      </a>
      <div className="mt-4">
        <PageHeader title={title} subtitle={subtitle} />
      </div>
    </div>
  )
}
