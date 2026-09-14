import { stays } from '../../data/mock/stays'
import type { HotelStay } from './stays.types'

const STAY_ROOM_STORAGE_KEY = 'partout.hotel.stay-room-references.v1'

export type StayRoomReferenceReceipt = Readonly<{
  stayId: string
  room: string
}>

export type AssignRoomReferenceResult =
  | Readonly<{
      kind: 'saved'
      stay: HotelStay
      previousRoom: string
    }>
  | Readonly<{
      kind: 'invalid'
      reason: 'stay-not-found' | 'room-required'
    }>

function readReceipts(): ReadonlyArray<StayRoomReferenceReceipt> {
  if (typeof window === 'undefined') return []

  try {
    const parsed = JSON.parse(window.localStorage.getItem(STAY_ROOM_STORAGE_KEY) ?? '[]')
    if (!Array.isArray(parsed)) return []

    return parsed.filter(
      (candidate): candidate is StayRoomReferenceReceipt =>
        typeof candidate === 'object' &&
        candidate !== null &&
        typeof candidate.stayId === 'string' &&
        typeof candidate.room === 'string',
    )
  } catch {
    return []
  }
}

function writeReceipt(receipt: StayRoomReferenceReceipt) {
  if (typeof window === 'undefined') return

  const remaining = readReceipts().filter((candidate) => candidate.stayId !== receipt.stayId)
  window.localStorage.setItem(STAY_ROOM_STORAGE_KEY, JSON.stringify([...remaining, receipt]))
}

export function getResolvedHotelStay(stayId: string): HotelStay | undefined {
  const stay = stays.find((candidate) => candidate.id === stayId)
  if (!stay) return undefined

  const receipt = readReceipts().find((candidate) => candidate.stayId === stayId)
  return receipt ? { ...stay, room: receipt.room } : stay
}

export function getResolvedHotelStays(): ReadonlyArray<HotelStay> {
  return stays.map((stay) => getResolvedHotelStay(stay.id) ?? stay)
}

export function assignRoomReference(stayId: string, room: string): AssignRoomReferenceResult {
  const currentStay = getResolvedHotelStay(stayId)
  if (!currentStay) return { kind: 'invalid', reason: 'stay-not-found' }

  const nextRoom = room.trim()
  if (!nextRoom) return { kind: 'invalid', reason: 'room-required' }

  writeReceipt({ stayId, room: nextRoom })

  return {
    kind: 'saved',
    previousRoom: currentStay.room,
    stay: { ...currentStay, room: nextRoom },
  }
}
