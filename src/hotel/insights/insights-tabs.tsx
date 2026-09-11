const sections = [
  { label: 'Overview', href: '#overview' },
  { label: 'Creators', href: '#creators' },
  { label: 'Content', href: '#content' },
] as const

export function InsightsTabs() {
  return (
    <nav className="mt-4 flex items-center gap-1" aria-label="Insight sections">
      {sections.map((section, index) => (
        <a
          key={section.label}
          href={section.href}
          className={`flex h-7 items-center rounded-control px-2.5 text-[8px] font-medium transition-colors ${
            index === 0
              ? 'bg-partout-action text-white hover:bg-partout-action-hover'
              : 'text-partout-text-muted hover:bg-partout-muted hover:text-partout-text'
          }`}
        >
          {section.label}
        </a>
      ))}
    </nav>
  )
}
