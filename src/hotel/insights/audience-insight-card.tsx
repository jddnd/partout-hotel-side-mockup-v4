import type { CSSProperties } from 'react'
import type { AudienceSlice } from './insights.types'

const chartColors = ['#075943', '#6f988a', '#a8beb6', '#d7e1dd', '#edf1ef'] as const

export function AudienceInsightCard({
  countries,
  ages,
  genders,
}: Readonly<{
  countries: ReadonlyArray<AudienceSlice>
  ages: ReadonlyArray<AudienceSlice>
  genders: ReadonlyArray<AudienceSlice>
}>) {
  const maxCountry = Math.max(...countries.map((country) => country.share), 1)

  return (
    <section className="rounded-card border border-partout-border bg-partout-surface p-4 shadow-card" aria-labelledby="audience-insight-title">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 id="audience-insight-title" className="text-[10px] font-medium text-partout-text">Audience</h2>
          <p className="mt-1 text-[7px] text-partout-text-muted">Platform audience reached this period</p>
        </div>
        <button type="button" className="text-[7px] font-medium text-partout-action hover:text-partout-action-hover">View audience</button>
      </div>

      <div className="mt-4 grid gap-5 lg:grid-cols-[1.25fr_1fr_1fr]">
        <div>
          <p className="text-[7px] font-medium text-partout-text-muted">Top countries</p>
          <div className="mt-2 space-y-2">
            {countries.map((country) => (
              <div key={country.label} className="grid grid-cols-[68px_minmax(0,1fr)_26px] items-center gap-2 text-[7px]">
                <span className="truncate text-partout-text">{country.label}</span>
                <span className="h-1 rounded-full bg-partout-muted" aria-hidden="true">
                  <span className="block h-full rounded-full bg-partout-action" style={{ width: `${(country.share / maxCountry) * 100}%` }} />
                </span>
                <span className="text-right text-partout-text-muted">{country.share}%</span>
              </div>
            ))}
          </div>
        </div>

        <Donut title="Age" segments={ages} />
        <Donut title="Gender" segments={genders} />
      </div>
    </section>
  )
}

function Donut({ title, segments }: Readonly<{ title: string; segments: ReadonlyArray<AudienceSlice> }>) {
  let cursor = 0
  const stops = segments.map((segment, index) => {
    const start = cursor
    cursor += segment.share
    return `${chartColors[index % chartColors.length]} ${start}% ${cursor}%`
  })

  return (
    <div>
      <p className="text-[7px] font-medium text-partout-text-muted">{title}</p>
      <div className="mt-3 flex items-center gap-3">
        <span
          className="relative block size-[72px] shrink-0 rounded-full"
          style={{ background: `conic-gradient(${stops.join(', ')})` } as CSSProperties}
          role="img"
          aria-label={`${title} audience distribution`}
        >
          <span className="absolute inset-[10px] rounded-full bg-partout-surface" />
        </span>
        <ul className="min-w-0 space-y-1.5">
          {segments.map((segment, index) => (
            <li key={segment.label} className="flex items-center gap-1.5 text-[6px] text-partout-text-muted">
              <span className="size-1.5 rounded-full" style={{ backgroundColor: chartColors[index % chartColors.length] }} />
              <span className="truncate">{segment.label}</span>
              <span className="ml-auto pl-1 font-medium text-partout-text">{segment.share}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
