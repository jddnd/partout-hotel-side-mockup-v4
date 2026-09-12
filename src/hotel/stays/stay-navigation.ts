import type { HotelStay } from './stays.types'

export function getStayMessageHref(stay: HotelStay) {
  return stay.conversationId
    ? `/hotel/messages?creator=${encodeURIComponent(stay.conversationId)}`
    : '/hotel/messages'
}

export function getStayCreatorProfileHref(stay: HotelStay) {
  return stay.creatorProfileId
    ? `/hotel/applications/${encodeURIComponent(stay.creatorProfileId)}`
    : '/hotel/applications'
}
