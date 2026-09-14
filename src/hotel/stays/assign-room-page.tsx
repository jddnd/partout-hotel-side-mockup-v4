import { Button } from '../../components/ui/button'
import { assignRoomReference, getResolvedHotelStay, getResolvedHotelStays } from './stay-room-reference'

export function AssignRoomPage() {
  const availableStays = getResolvedHotelStays()

  function hideResult(form: HTMLFormElement) {
    const status = form.querySelector<HTMLElement>('[data-room-status]')
    if (status) status.hidden = true
  }

  function updateSaveState(form: HTMLFormElement) {
    const stay = form.elements.namedItem('stayId') as HTMLSelectElement | null
    const room = form.elements.namedItem('room') as HTMLInputElement | null
    const save = form.elements.namedItem('saveRoom') as HTMLButtonElement | null
    if (save) save.disabled = !stay?.value || !room?.value.trim()
  }

  function selectStay(event: React.ChangeEvent<HTMLSelectElement>) {
    const form = event.currentTarget.form
    if (!form) return

    const selectedStay = getResolvedHotelStay(event.currentTarget.value)
    const room = form.elements.namedItem('room') as HTMLInputElement | null
    const context = form.querySelector<HTMLElement>('[data-selected-stay]')

    if (room) {
      room.value = selectedStay?.room ?? ''
      room.disabled = !selectedStay
    }
    if (context) context.textContent = selectedStay ? `${selectedStay.creatorName} · ${selectedStay.campaign}` : 'Choose an existing stay'

    hideResult(form)
    updateSaveState(form)
  }

  function editRoom(event: React.FormEvent<HTMLInputElement>) {
    const form = event.currentTarget.form
    if (!form) return
    hideResult(form)
    updateSaveState(form)
  }

  function saveRoom(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const data = new FormData(form)
    const result = assignRoomReference(String(data.get('stayId') ?? ''), String(data.get('room') ?? ''))
    const status = form.querySelector<HTMLElement>('[data-room-status]')
    const message = form.querySelector<HTMLElement>('[data-room-status-message]')
    const change = form.querySelector<HTMLElement>('[data-room-status-change]')
    const openStay = form.querySelector<HTMLAnchorElement>('[data-room-open-stay]')

    if (!status || !message || !change || !openStay) return

    status.hidden = false
    if (result.kind === 'invalid') {
      message.textContent = result.reason === 'room-required' ? 'Enter a room reference.' : 'That stay is not available.'
      change.textContent = ''
      openStay.hidden = true
      return
    }

    message.textContent = `Room reference saved for ${result.stay.creatorName}.`
    change.textContent = `${result.previousRoom} → ${result.stay.room}`
    openStay.href = `/hotel/stays/${encodeURIComponent(result.stay.id)}`
    openStay.hidden = false
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

        <form className="mt-6" onSubmit={saveRoom}>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-[8px] font-medium text-partout-text">Stay</span>
              <select
                name="stayId"
                defaultValue=""
                onChange={selectStay}
                required
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
                name="room"
                defaultValue=""
                onInput={editRoom}
                placeholder="e.g. Sea View 214"
                disabled
                required
                className="mt-2 h-10 w-full rounded-control border border-partout-border bg-partout-surface px-3 text-[9px] text-partout-text outline-none transition-colors placeholder:text-partout-text-muted focus:border-partout-action disabled:opacity-50"
              />
            </label>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-partout-border pt-5">
            <Button name="saveRoom" type="submit" disabled className="h-9 px-4 text-[9px]">
              Save room
            </Button>
            <p data-selected-stay className="text-[8px] text-partout-text-muted">Choose an existing stay</p>
          </div>

          <div data-room-status hidden className="mt-5 rounded-control border border-partout-border bg-partout-muted px-4 py-3" role="status">
            <p data-room-status-message className="text-[8px] font-medium text-partout-text" />
            <p data-room-status-change className="mt-1 text-[7px] text-partout-text-muted" />
            <a data-room-open-stay hidden className="mt-2 inline-flex text-[8px] font-medium text-partout-action hover:underline hover:underline-offset-2">
              Open stay
            </a>
          </div>
        </form>
      </section>
    </div>
  )
}
