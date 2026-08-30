import type { ChatMessage, ConversationContext, HotelConversation } from '../../hotel/messages/messages.types'

export const conversations: ReadonlyArray<HotelConversation> = [
  {
    id: 'sofie-larsen',
    creatorName: 'Sofie Larsen',
    initials: 'SL',
    preview: 'Perfect, I’ll be there around 15:30. Thank you!',
    timestamp: '10:42',
    unread: 2,
    status: 'Active stay',
    campaign: 'Coastal Escape',
  },
  {
    id: 'clara-moreau',
    creatorName: 'Clara Moreau',
    initials: 'CM',
    preview: 'Would it be possible to move dinner to 20:00?',
    timestamp: '09:18',
    unread: 1,
    status: 'Upcoming stay',
    campaign: 'Summer Wellness',
  },
  {
    id: 'ida-moller',
    creatorName: 'Ida Møller',
    initials: 'IM',
    preview: 'I’ve added the final story link to the stay.',
    timestamp: 'Yesterday',
    status: 'Active stay',
    campaign: 'Heritage & History',
  },
  {
    id: 'anna-berg',
    creatorName: 'Anna Berg',
    initials: 'AB',
    preview: 'Thanks for the invitation — the dates work for me.',
    timestamp: 'Yesterday',
    status: 'Application',
    campaign: 'Culinary Journey',
  },
  {
    id: 'maya-holm',
    creatorName: 'Maya Holm',
    initials: 'MH',
    preview: 'Looking forward to seeing the property again.',
    timestamp: 'Mon',
    status: 'Upcoming stay',
    campaign: 'Family Getaway',
  },
]

export const activeConversationMessages: ReadonlyArray<ChatMessage> = [
  {
    id: 'm1',
    sender: 'creator',
    body: 'Hi! Just checking whether early check-in might be possible tomorrow. I’ll arrive in Helsingør a little earlier than expected.',
    timestamp: '10:26',
  },
  {
    id: 'm2',
    sender: 'hotel',
    body: 'Hi Sofie — absolutely. Your room should be ready from 15:00, and we’ll keep your luggage at reception if you arrive before then.',
    timestamp: '10:31',
  },
  {
    id: 'm3',
    sender: 'creator',
    body: 'Amazing. I’m planning to shoot by the water before dinner, so that works perfectly.',
    timestamp: '10:37',
  },
  {
    id: 'm4',
    sender: 'hotel',
    body: 'Great. I’ve also let the restaurant know you’ll join at 19:30. If anything changes, just message us here.',
    timestamp: '10:39',
  },
  {
    id: 'm5',
    sender: 'creator',
    body: 'Perfect, I’ll be there around 15:30. Thank you!',
    timestamp: '10:42',
  },
]

export const activeConversationContext: ConversationContext = {
  campaign: 'Coastal Escape',
  campaignDates: 'May 1 – May 31, 2025',
  stayStatus: 'Active stay',
  room: 'Sea View 214',
  checkIn: 'May 14 · 15:00',
  checkOut: 'May 16 · 11:00',
  agreedContentCompleted: 3,
  agreedContentTotal: 4,
}
