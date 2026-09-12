import type { HotelApplication } from '../../hotel/applications/applications.types'

export const applications: ReadonlyArray<HotelApplication> = [
  {
    id: 'coastal-escape-sofie-larsen',
    creatorId: 'sofie-larsen',
    campaignId: 'coastal-escape',
    campaignName: 'Coastal Escape',
    requestedDates: 'May 5–7',
    pitch: 'I would love to tell the story of Marienlyst as a slow coastal reset — sea, spa and dinner, with the stay feeling personal rather than staged.',
    fitScore: '92%',
  },
  {
    id: 'coastal-escape-james-holloway',
    creatorId: 'james-holloway',
    campaignId: 'coastal-escape',
    campaignName: 'Coastal Escape',
    requestedDates: 'May 18–20',
    pitch: 'I see this as a contrast story: Copenhagen energy followed by two days by the water. I would build the stay around the journey, the coastline and the change of pace.',
    fitScore: '88%',
  },
  {
    id: 'summer-wellness-clara-moreau',
    creatorId: 'clara-moreau',
    campaignId: 'summer-wellness',
    campaignName: 'Summer Wellness',
    requestedDates: 'Jun 12–14',
    pitch: 'I want to make the hotel feel like the destination rather than a backdrop — morning light, spa rituals, dressing for dinner and small details throughout the stay.',
    fitScore: '90%',
  },
]
