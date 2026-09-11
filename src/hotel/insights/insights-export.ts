import {
  audienceAges,
  audienceCountries,
  audienceGenders,
  bookingCampaigns,
  bookingMetrics,
  contentFormats,
  insightMetrics,
  topCampaigns,
  topTalent,
} from '../../data/mock/insights'

function csvCell(value: string | number) {
  return `"${String(value).replaceAll('"', '""')}"`
}

export function exportMockInsightsCsv() {
  if (typeof document === 'undefined') return

  const rows: Array<Array<string | number>> = [
    ['Section', 'Name', 'Detail', 'Value'],
    ...insightMetrics.map((metric) => ['Overview', metric.label, metric.delta, metric.value]),
    ...topCampaigns.map((item) => ['Campaigns', item.label, item.meta, item.value]),
    ...topTalent.map((item) => ['Creators', item.label, item.meta, item.value]),
    ...contentFormats.map((item) => ['Content', item.format, `${item.engagement} engagement`, item.reach]),
    ...audienceCountries.map((item) => ['Audience · Country', item.label, 'Share', `${item.share}%`]),
    ...audienceAges.map((item) => ['Audience · Age', item.label, 'Share', `${item.share}%`]),
    ...audienceGenders.map((item) => ['Audience · Gender', item.label, 'Share', `${item.share}%`]),
    ...bookingMetrics.map((metric) => ['Bookings', metric.label, metric.delta, metric.value]),
    ...bookingCampaigns.map((item) => ['Bookings · Campaign', item.label, item.meta, item.value]),
  ]

  const csv = rows.map((row) => row.map(csvCell).join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = 'partout-hotel-insights-mock.csv'
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 0)
}
