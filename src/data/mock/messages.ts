import type { ChatMessage, HotelConversation } from '../../hotel/messages/messages.types'

export const conversations: ReadonlyArray<HotelConversation> = [
  {
    id: 'sofie-larsen',
    creatorId: 'sofie-larsen',
    relationshipId: 'relationship-sofie-larsen',
    preview: 'Perfect, I’ll be there around 15:30. Thank you!',
    timestamp: '10:42',
    unread: 2,
  },
  {
    id: 'clara-moreau',
    creatorId: 'clara-moreau',
    relationshipId: 'relationship-clara-moreau',
    preview: 'Would it be possible to move dinner to 20:00?',
    timestamp: '09:18',
    unread: 1,
  },
  {
    id: 'ida-moller',
    creatorId: 'ida-moller',
    relationshipId: 'relationship-ida-moller',
    preview: 'I’ve added the final story link to the stay.',
    timestamp: 'Yesterday',
  },
  {
    id: 'anna-berg',
    creatorId: 'anna-berg',
    relationshipId: 'relationship-anna-berg',
    preview: 'Thanks — I’m happy to answer anything before you decide.',
    timestamp: 'Yesterday',
  },
  {
    id: 'james-holloway',
    creatorId: 'james-holloway',
    relationshipId: 'relationship-james-holloway',
    preview: 'No messages yet',
    timestamp: 'Tue',
  },
  {
    id: 'maya-patel',
    creatorId: 'maya-patel',
    relationshipId: 'relationship-maya-patel',
    preview: 'Looking forward to seeing the property again.',
    timestamp: 'Mon',
  },
]

export const conversationMessages: Readonly<Record<string, ReadonlyArray<ChatMessage>>> = {
  'sofie-larsen': [
    {
      id: 'sofie-m1',
      sender: 'creator',
      body: 'Hi! Just checking whether early check-in might be possible tomorrow. I’ll arrive in Helsingør a little earlier than expected.',
      timestamp: '10:26',
    },
    {
      id: 'sofie-m2',
      sender: 'hotel',
      body: 'Hi Sofie — absolutely. Your room should be ready from 15:00, and we’ll keep your luggage at reception if you arrive before then.',
      timestamp: '10:31',
    },
    {
      id: 'sofie-m3',
      sender: 'creator',
      body: 'Amazing. I’m planning to shoot by the water before dinner, so that works perfectly.',
      timestamp: '10:37',
    },
    {
      id: 'sofie-m4',
      sender: 'hotel',
      body: 'Great. I’ve also let the restaurant know you’ll join at 19:30. If anything changes, just message us here.',
      timestamp: '10:39',
    },
    {
      id: 'sofie-m5',
      sender: 'creator',
      body: 'Perfect, I’ll be there around 15:30. Thank you!',
      timestamp: '10:42',
    },
  ],
  'clara-moreau': [
    {
      id: 'clara-m1',
      sender: 'creator',
      body: 'Hi — would it be possible to move dinner to 20:00 tomorrow? I’d love a little more time around the spa before getting ready.',
      timestamp: '09:18',
    },
    {
      id: 'clara-m2',
      sender: 'hotel',
      body: 'Of course. We’ve moved your table to 20:00 and the spa team will still meet you at 16:30.',
      timestamp: '09:24',
    },
  ],
  'ida-moller': [
    {
      id: 'ida-m1',
      sender: 'creator',
      body: 'I’ve added the final story link to the stay. Thanks again for such a warm visit.',
      timestamp: 'Yesterday · 16:12',
    },
    {
      id: 'ida-m2',
      sender: 'hotel',
      body: 'We loved having you back, Ida. Everything is showing on our side — and the sunset story is beautiful.',
      timestamp: 'Yesterday · 16:34',
    },
  ],
  'anna-berg': [
    {
      id: 'anna-m1',
      sender: 'creator',
      body: 'Thanks for taking a look at my application. I’m happy to answer anything before you decide.',
      timestamp: 'Yesterday · 11:08',
    },
  ],
  'james-holloway': [],
  'maya-patel': [
    {
      id: 'maya-m1',
      sender: 'creator',
      body: 'Looking forward to seeing the property again. I still think about breakfast by the windows from last time.',
      timestamp: 'Mon · 14:20',
    },
    {
      id: 'maya-m2',
      sender: 'hotel',
      body: 'We remember that morning too. Your room is set for May 18 and we’ll send the dinner timing here once it’s confirmed.',
      timestamp: 'Mon · 14:45',
    },
  ],
}
