import { Building2, ChevronRight, Images, UserCircle } from 'lucide-react'
import { PageHeader } from '../shell/page-header'

const destinations = [
  {
    href: '/hotel/settings/profile',
    label: 'Hotel profile',
    detail: 'Name, location, description, logo and photograph.',
    icon: Building2,
  },
  {
    href: '/hotel/settings/gallery',
    label: 'Gallery',
    detail: 'The photographs creators see when they look at your hotel.',
    icon: Images,
  },
  {
    href: '/hotel/settings/account',
    label: 'Account',
    detail: 'Your member identity and sign-in email.',
    icon: UserCircle,
  },
] as const

export function SettingsIndexPage() {
  return (
    <div>
      <PageHeader title="Settings" subtitle="Your hotel, as creators see it." />

      <section className="mt-8 max-w-[760px]" aria-labelledby="settings-hotel-title">
        <h2 id="settings-hotel-title" className="text-[9px] font-medium uppercase tracking-[0.08em] text-partout-text-muted">
          Your hotel
        </h2>
        <div className="mt-3 overflow-hidden rounded-card border border-partout-border bg-partout-surface shadow-card">
          {destinations.map(({ href, label, detail, icon: Icon }, index) => (
            <a
              key={href}
              href={href}
              className={`group flex min-h-[76px] items-center gap-4 px-5 py-4 transition-colors hover:bg-partout-canvas ${index > 0 ? 'border-t border-partout-border' : ''}`}
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-partout-muted text-partout-text-muted">
                <Icon aria-hidden="true" size={15} strokeWidth={1.6} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[11px] font-medium text-partout-text">{label}</span>
                <span className="mt-1 block text-[8px] text-partout-text-muted">{detail}</span>
              </span>
              <ChevronRight aria-hidden="true" className="shrink-0 text-partout-text-muted transition-transform group-hover:translate-x-0.5" size={13} strokeWidth={1.6} />
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}
