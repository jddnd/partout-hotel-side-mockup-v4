import { useState } from 'react'
import { Button } from '../../components/ui/button'
import {
  assignRoomReference,
  getResolvedHotelStay,
  getResolvedHotelStays,
  type AssignRoomReferenceResult,
} from './stay-room-reference'

export function AssignRoomPage() {
  const [stayId, setStayId] = useState('')
  const [room, setRoom] = useState('')
  const [result, setResult] = useState<AssignRoomReferenceResult | null>(null)
  const availableStays = getResolvedHotelStays()
  const selectedStay = stayId ? getResolvedHotelStay(stayId) : undefined

  function selectStay(nextStayId: string) {
    setStayId(nextStayId)
    setRoom(getResolvedHotelStay(nextStayId)?.room ?? '')
    setResult(null)
  }

  function saveRoom() {
    if (!stayId) return
    const nextResult = assignRoomReference(stayId, room)
    setResult(nextResult)
    if (nextResult.kind === 'saved') setRoom(nextResult.stay.room)
  }

  return (
    <div className="mx-auto w-full max-w-[760px] pb-12 pt-9">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <a href="/hotel" className="text-[9px] font-medium text-partout-action transition-colors hover:text-partout-action-hover">
          ‹ Back to Today
        </a>
        <p className="text-[7px] font-medium uppercase tracking-[0.17em] text-partout-text-muted">Stay logistics</p>
      </div>

      <section className="mt-5 rounded-card border border-partout-border bg-partout-surface p-6 shadow-card">
        <p className="text-[7px] font-medium uppercase tracking-[0.16em] text-partout-text-muted">Assign room</p>
        <h1 className="mt-2 font-display text-[32px] font-normal leading-none tracking-[-0.035em] text-partout-text">
          Set the room for a stay
        </h1>
        <p className="mt-3 max-w-[580px] text-[9px] leading-5 text-partout-text-muted">
          Record the room reference your hotel has already chosen. Partout does not check availability or create a reservation.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-[8px] font-medium text-partout-text">Stay</span>
            <select
              value={stayId}
              onChange={(event) => selectStay(event.target.value)}
              className="mt-2 h-10 w-full rounded-control border border-partout-border bg-partout-surface px-3 text-[9px] text-partout-text outline-none transition-colors focus:border-partout-action"
            >
              <option value="">Choose stay</option>
              {availableStays.map((stay) => (
                <option key={stay.id} value={stay.id}>
                  {stay.creatorName} · {stay.dates} · {stay.room}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-[8px] font-medium text-partout-text">Room reference</span>
            <input
              value={room}
              onChange={(event) => {
                setRoom(event.target.value)
                setResult(null)
              }}
              placeholder="e.g. Sea View 214"
              disabled={!selectedStay}
              className="mt-2 h-10 w-full rounded-control border border-partout-border bg-partout-surface px-3 text-[9px] text-partout-text outline-none transition-colors placeholder:text-partout-text-muted focus:border-partout-action disabled:opacity-50"
            />
          </label>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-partout-border pt-5">
          <Button onClick={saveRoom} disabled={!selectedStay || !room.trim()} className="h-9 px-4 text-[9px]">
            Save room
          </Button>
          <p className="text-[8px] text-partout-text-muted">
            {selectedStay ? `${selectedStay.creatorName} · ${selectedStay.campaign}` : 'Choose an existing stay'}
          </p>
        </div>

        {result ? <AssignRoomResult result={result} /> : null}
      </section>
    </div>
  )
}

function AssignRoomResult({ result }: Readonly<{ result: AssignRoomReferenceResult }>) {
  if (result.kind === 'invalid') {
    return (
      <div className="mt-5 rounded-control border border-partout-border bg-partout-muted px-4 py-3" role="status">
        <p className="text-[8px] font-medium text-partout-text">
          {result.reason === 'room-required' ? 'Enter a room reference.' : 'That stay is not available.'}
        </p>
      </div>
    )
  }

  return (
    <div className="mt-5 rounded-control border border-partout-border bg-partout-muted px-4 py-3" role="status">
      <p className="text-[8px] font-medium text-partout-text">Room reference saved for {result.stay.creatorName}.</p>
      <p className="mt-1 text-[7px] text-partout-text-muted">
        {result.previousRoom} → {result.stay.room}
      </p>
      <a href={`/hotel/stays/${encodeURIComponent(result.stay.id)}`} className="mt-2 inline-flex text-[8px] font-medium text-partout-action hover:underline hover:underline-offset-2">
        Open stay
      </a>
    </div>
  )
}
