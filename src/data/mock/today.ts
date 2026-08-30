import { CircleDollarSign, FileText, Hotel, Users } from 'lucide-react'
import type { ActionItem, Arrival, StayTimelineItem, TodayMetric } from '../../hotel/today/today.types'

export const todayMetrics: TodayMetric[] = [
  { label: 'Active stays', value: '18', detail: '+3 vs yesterday', icon: Hotel },
  { label: 'Pending applications', value: '12', detail: '4 vs yesterday', icon: Users },
  { label: 'Active campaigns', value: '5', detail: '2 ending soon', icon: FileText },
  { label: 'Projected EMV', value: '€312,480', detail: '+16% vs last 30 days', icon: CircleDollarSign },
]

export const arrivals: Arrival[] = [
  { initials: 'SL', name: 'Sofie Larsen', relative: 'Today', dates: 'May 14 – May 16', status: 'Confirmed' },
  { initials: 'JH', name: 'James Holloway', relative: 'Tomorrow', dates: 'May 15 – May 17', status: 'Confirmed' },
  { initials: 'CM', name: 'Clara Moreau', relative: 'Fri, May 16', dates: 'May 16 – May 18', status: 'Confirmed' },
  { initials: 'DK', name: 'Daniel Kahn', relative: 'Sat, May 17', dates: 'May 17 – May 20', status: 'Confirmed' },
  { initials: 'MP', name: 'Maya Patel', relative: 'Sun, May 18', dates: 'May 18 – May 20', status: 'Confirmed' },
]

export const needsAction: ActionItem[] = [
  { count: 4, label: 'Applications need review' },
  { count: 2, label: 'Stays check-in today' },
  { count: 1, label: 'Campaign deliverable due' },
  { count: 1, label: 'Underperforming campaign' },
]

export const stayTimeline: StayTimelineItem[] = [
  { initials: 'SL', name: 'Sofie Larsen', startPercent: 3, widthPercent: 35, state: 'confirmed' },
  { initials: 'JH', name: 'James Holloway', startPercent: 17, widthPercent: 43, state: 'confirmed' },
  { initials: 'CM', name: 'Clara Moreau', startPercent: 28, widthPercent: 39, state: 'confirmed' },
  { initials: 'DK', name: 'Daniel Kahn', startPercent: 38, widthPercent: 29, state: 'upcoming' },
  { initials: 'MP', name: 'Maya Patel', startPercent: 43, widthPercent: 46, state: 'confirmed' },
]
