import { conversations } from '../../data/mock/messages'
import type { HotelStay } from './stays.types'

export function getStayMessageHref(stay: HotelStay) {
  const conversation = conversations.find((candidate) => candidate.relationshipId === stay.relationshipId)
  return conversation
    ? `/hotel/messages?creator=${encodeURIComponent(conversation.creatorId)}`
    : '/hotel/messages'
}

export function getStayCreatorProfileHref(stay: HotelStay) {
  return `/hotel/creators/${encodeURIComponent(stay.creatorId)}`
}
