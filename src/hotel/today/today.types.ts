import type { LucideIcon } from 'lucide-react'

export type TodayMetric = {
  label: string
  value: string
  detail: string
  icon: LucideIcon
}

export type Arrival = {
  initials: string
  name: string
  relative: string
  dates: string
  status: 'Confirmed'
}

export type ActionItem = {
  count: number
  label: string
}

export type StayTimelineItem = {
  initials: string
  name: string
  startPercent: number
  widthPercent: number
  state: 'confirmed' | 'upcoming'
}
