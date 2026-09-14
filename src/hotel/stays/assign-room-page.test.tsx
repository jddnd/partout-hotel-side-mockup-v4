import '@testing-library/jest-dom/vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { AssignRoomPage } from './assign-room-page'
import { getResolvedHotelStay } from './stay-room-reference'

beforeEach(() => window.localStorage.clear())
afterEach(() => {
  cleanup()
  window.localStorage.clear()
})

describe('AssignRoomPage', () => {
  it('loads the current room for the selected Stay and saves an update', () => {
    render(<AssignRoomPage />)

    expect(screen.getByRole('heading', { name: 'Set the room for a stay' })).toBeInTheDocument()
    expect(screen.getByText(/does not check availability or create a reservation/i)).toBeInTheDocument()

    fireEvent.change(screen.getByLabelText('Stay'), { target: { value: 'sofie-larsen' } })
    expect(screen.getByLabelText('Room reference')).toHaveValue('Sea View 214')

    fireEvent.change(screen.getByLabelText('Room reference'), { target: { value: 'Garden 412' } })
    fireEvent.click(screen.getByRole('button', { name: 'Save room' }))

    expect(screen.getByRole('status')).toHaveTextContent('Room reference saved for Sofie Larsen.')
    expect(screen.getByRole('status')).toHaveTextContent('Sea View 214 → Garden 412')
    expect(screen.getByRole('link', { name: 'Open stay' })).toHaveAttribute('href', '/hotel/stays/sofie-larsen')
    expect(getResolvedHotelStay('sofie-larsen')?.room).toBe('Garden 412')
  })

  it('does not enable save until a Stay and non-empty room reference are present', () => {
    render(<AssignRoomPage />)

    expect(screen.getByRole('button', { name: 'Save room' })).toBeDisabled()
    fireEvent.change(screen.getByLabelText('Stay'), { target: { value: 'james-holloway' } })
    expect(screen.getByRole('button', { name: 'Save room' })).toBeEnabled()
    fireEvent.change(screen.getByLabelText('Room reference'), { target: { value: '   ' } })
    expect(screen.getByRole('button', { name: 'Save room' })).toBeDisabled()
  })
})
