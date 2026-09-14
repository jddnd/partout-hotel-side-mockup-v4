import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { stays } from '../../data/mock/stays'
import { assignRoomReference, getResolvedHotelStay, getResolvedHotelStays } from './stay-room-reference'

beforeEach(() => window.localStorage.clear())
afterEach(() => window.localStorage.clear())

describe('Stay room reference', () => {
  it('updates only the room reference for an existing Stay', () => {
    const original = stays.find((stay) => stay.id === 'sofie-larsen')
    const result = assignRoomReference('sofie-larsen', '  Garden 412  ')

    expect(original).toBeDefined()
    expect(result.kind).toBe('saved')
    if (result.kind !== 'saved' || !original) return

    expect(result.previousRoom).toBe('Sea View 214')
    expect(result.stay.room).toBe('Garden 412')
    expect(result.stay.creatorId).toBe(original.creatorId)
    expect(result.stay.collaborationId).toBe(original.collaborationId)
    expect(result.stay.campaignId).toBe(original.campaignId)
    expect(result.stay.dates).toBe(original.dates)
    expect(result.stay.status).toBe(original.status)
    expect(getResolvedHotelStay('sofie-larsen')?.room).toBe('Garden 412')
    expect(getResolvedHotelStays()).toHaveLength(stays.length)
  })

  it('updates an existing room reference without creating another Stay', () => {
    expect(assignRoomReference('james-holloway', 'Harbour 220').kind).toBe('saved')
    expect(assignRoomReference('james-holloway', 'Harbour 224').kind).toBe('saved')

    expect(getResolvedHotelStay('james-holloway')?.room).toBe('Harbour 224')
    expect(getResolvedHotelStays().filter((stay) => stay.id === 'james-holloway')).toHaveLength(1)
  })

  it('refuses empty room references and unknown Stays', () => {
    expect(assignRoomReference('sofie-larsen', '   ')).toEqual({ kind: 'invalid', reason: 'room-required' })
    expect(assignRoomReference('missing-stay', '214')).toEqual({ kind: 'invalid', reason: 'stay-not-found' })
    expect(getResolvedHotelStay('sofie-larsen')?.room).toBe('Sea View 214')
  })
})
