import { beforeEach, describe, expect, it } from 'vitest'
import { conversationMessages, conversations } from '../../data/mock/messages'
import { sendMockRelationshipMessage } from './relationship-message-send-action'
import { getMockConversationMessages, hydrateMockConversation } from './relationship-message-storage'

beforeEach(() => window.localStorage.clear())

describe('sendMockRelationshipMessage', () => {
  it('stores trimmed hotel text in the existing durable relationship conversation', () => {
    const conversation = conversations.find((candidate) => candidate.id === 'james-holloway')
    expect(conversation).toBeDefined()
    if (!conversation) return

    const result = sendMockRelationshipMessage(
      conversation,
      '  Hi James — looking forward to welcoming you.  ',
      new Date(2026, 8, 14, 1, 12),
    )

    expect(result.kind).toBe('sent')
    if (result.kind !== 'sent') return

    expect(result.message).toMatchObject({
      sender: 'hotel',
      body: 'Hi James — looking forward to welcoming you.',
      timestamp: '01:12',
    })

    expect(getMockConversationMessages(conversationMessages, conversation)).toEqual([
      result.message,
    ])
    expect(hydrateMockConversation(conversation)).toMatchObject({
      id: conversation.id,
      relationshipId: conversation.relationshipId,
      preview: result.message.body,
      timestamp: '01:12',
    })
  })

  it('refuses an empty message and persists nothing', () => {
    const conversation = conversations[0]
    const result = sendMockRelationshipMessage(conversation, '   ')

    expect(result).toEqual({ kind: 'invalid', reason: 'message-body-required' })
    expect(getMockConversationMessages(conversationMessages, conversation)).toEqual(
      conversationMessages[conversation.id] ?? [],
    )
  })

  it('does not leak a sent message into another relationship conversation', () => {
    const james = conversations.find((candidate) => candidate.id === 'james-holloway')
    const sofie = conversations.find((candidate) => candidate.id === 'sofie-larsen')
    expect(james).toBeDefined()
    expect(sofie).toBeDefined()
    if (!james || !sofie) return

    const result = sendMockRelationshipMessage(james, 'For James only', new Date(2026, 8, 14, 1, 15))
    expect(result.kind).toBe('sent')

    expect(getMockConversationMessages(conversationMessages, sofie)).toEqual(
      conversationMessages[sofie.id],
    )
  })
})
