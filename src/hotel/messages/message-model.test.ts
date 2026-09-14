import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { conversations } from '../../data/mock/messages'
import { assignRoomReference } from '../stays/stay-room-reference'
import { resolveConversationContext } from './message-model'

beforeEach(() => window.localStorage.clear())
afterEach(() => window.localStorage.clear())

describe('message model Stay context', () => {
  it('uses the current Stay room reference for an existing conversation', () => {
    const conversation = conversations.find((candidate) => candidate.creatorId === 'sofie-larsen')
    expect(conversation).toBeDefined()
    if (!conversation) return

    expect(resolveConversationContext(conversation)?.room).toBe('Sea View 214')
    assignRoomReference('sofie-larsen', 'Garden 412')
    expect(resolveConversationContext(conversation)?.room).toBe('Garden 412')
  })
})
