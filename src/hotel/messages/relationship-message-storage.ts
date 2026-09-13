import type { ChatMessage, HotelConversation } from './messages.types'

const RELATIONSHIP_MESSAGES_KEY = 'partout-hotel-relationship-messages-v1'

type StoredRelationshipMessage = Readonly<{
  conversationId: string
  relationshipId: string
  message: ChatMessage
}>

function readStoredRelationshipMessages(): ReadonlyArray<StoredRelationshipMessage> {
  if (typeof window === 'undefined') return []

  try {
    const parsed = JSON.parse(window.localStorage.getItem(RELATIONSHIP_MESSAGES_KEY) ?? '[]')
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function storedMessagesForConversation(conversation: HotelConversation) {
  return readStoredRelationshipMessages().filter(
    (stored) =>
      stored.conversationId === conversation.id &&
      stored.relationshipId === conversation.relationshipId,
  )
}

export function getMockConversationMessages(
  baseMessages: Readonly<Record<string, ReadonlyArray<ChatMessage>>>,
  conversation: HotelConversation,
): ReadonlyArray<ChatMessage> {
  return [
    ...(baseMessages[conversation.id] ?? []),
    ...storedMessagesForConversation(conversation).map((stored) => stored.message),
  ]
}

export function hydrateMockConversation(conversation: HotelConversation): HotelConversation {
  const storedMessages = storedMessagesForConversation(conversation)
  const latest = storedMessages[storedMessages.length - 1]?.message

  if (!latest) return conversation

  return {
    ...conversation,
    preview: latest.body,
    timestamp: latest.timestamp,
  }
}

export function saveMockRelationshipMessage(
  conversation: HotelConversation,
  message: ChatMessage,
): boolean {
  if (typeof window === 'undefined') return false

  try {
    const existing = readStoredRelationshipMessages().filter(
      (stored) =>
        !(
          stored.conversationId === conversation.id &&
          stored.relationshipId === conversation.relationshipId &&
          stored.message.id === message.id
        ),
    )

    window.localStorage.setItem(
      RELATIONSHIP_MESSAGES_KEY,
      JSON.stringify([
        ...existing,
        {
          conversationId: conversation.id,
          relationshipId: conversation.relationshipId,
          message,
        },
      ]),
    )

    return true
  } catch {
    return false
  }
}
