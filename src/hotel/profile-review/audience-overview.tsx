import type { CSSProperties } from 'react'
import type { AudienceSlice } from './profile-review.types'

const chartColors = ['#075943', '#7fa497', '#b7cbc3', '#dce4df', '#eef1ef'] as const

export function AudienceOverview({
  countries,
  ages,
  genders,
}: Readonly<{
  countries: ReadonlyArray<AudienceSlice>
  ages: ReadonlyArray<AudienceSlice>
  genders: ReadonlyArray<AudienceSlice>
}>) {
  return (
    <section className="border-t border-partout-border px-4 py-6" aria-labelledby="audience-overview-title">
      <h2 id="audience-overview-title" className="text-[10px] font-medium text-partout-text">
        Audience overview
      </h2>

      <div className="mt-4 grid gap-5 lg:grid-cols-[1.25fr_1fr_1fr]">
        <CountryBreakdown countries={countries} />
        <DonutBreakdown title="Age" segments={ages} />
        <DonutBreakdown title="Gender" segments={genders} />
      </div>
    </section>
  )
}

function CountryBreakdown({ countries }: Readonly<{ countries: ReadonlyArray<AudienceSlice> }>) {
  const maxShare = Math.max(...countries.map((country) => country.share), 1)

  return (
    <div>
      <p className="text-[8px] text-partout-text-muted">Top countries</p>
      <div className="mt-2 space-y-2">
        {countries.map((country) => (
          <div key={country.label} className="grid grid-cols-[54px_minmax(0,1fr)_26px] items-center gap-2 text-[8px]">
            <span className="truncate text-partout-text">{country.label}</span>
            <span className="h-1 rounded-full bg-partout-muted" aria-hidden="true">
              <span
                className="block h-full rounded-full bg-partout-action"
                style={{ width: `${(country.share / maxShare) * 100}%` }}
              />
            </span>
            <span className="text-right text-partout-text-muted">{country.share}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function DonutBreakdown({ title, segments }: Readonly<{ title: string; segments: ReadonlyArray<AudienceSlice> }>) {
  const background = buildConicGradient(segments)

  return (
    <div>
      <p className="text-[8px] text-partout-text-muted">{title}</p>
      <div className="mt-3 flex items-center gap-3">
        <span
          className="relative block size-[72px] shrink-0 rounded-full"
          style={{ background } as CSSProperties}
          role="img"
          aria-label={`${title} audience distribution`}
        >
          <span className="absolute inset-[10px] rounded-full bg-partout-surface" />
        </span>

        <ul className="min-w-0 space-y-1.5">
          {segments.map((segment, index) => (
            <li key={segment.label} className="flex items-center gap-1.5 text-[7px] text-partout-text-muted">
              <span className="size-1.5 rounded-full" style={{ backgroundColor: chartColors[index % chartColors.length] }} />
              <span className="truncate">{segment.label}</span>
              <span className="ml-auto pl-1 text-partout-text">{segment.share}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function buildConicGradient(segments: ReadonlyArray<AudienceSlice>) {
  let cursor = 0
  const stops = segments.map((segment, index) => {
    const start = cursor
    cursor += segment.share
    return `${chartColors[index % chartColors.length]} ${start}% ${cursor}%`
  })

  return `conic-gradient(${stops.join(', ')})`
}
