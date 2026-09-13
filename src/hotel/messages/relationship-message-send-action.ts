import type { ChatMessage, HotelConversation } from './messages.types'
import { saveMockRelationshipMessage } from './relationship-message-storage'

export type RelationshipMessageSendResult =
  | Readonly<{
      kind: 'sent'
      message: ChatMessage
    }>
  | Readonly<{
      kind: 'invalid'
      reason: 'message-body-required'
    }>
  | Readonly<{
      kind: 'not-saved'
      reason: 'storage-unavailable'
    }>

function formatClockTime(now: Date) {
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  return `${hours}:${minutes}`
}

function createMessageId(conversationId: string, now: Date) {
  const randomSuffix =
    typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2)

  return `relationship-message-${conversationId}-${now.getTime()}-${randomSuffix}`
}

export function sendMockRelationshipMessage(
  conversation: HotelConversation,
  body: string,
  now = new Date(),
): RelationshipMessageSendResult {
  const normalizedBody = body.trim()

  if (!normalizedBody) {
    return { kind: 'invalid', reason: 'message-body-required' }
  }

  const message: ChatMessage = {
    id: createMessageId(conversation.id, now),
    sender: 'hotel',
    body: normalizedBody,
    timestamp: formatClockTime(now),
  }

  if (!saveMockRelationshipMessage(conversation, message)) {
    return { kind: 'not-saved', reason: 'storage-unavailable' }
  }

  return { kind: 'sent', message }
}
