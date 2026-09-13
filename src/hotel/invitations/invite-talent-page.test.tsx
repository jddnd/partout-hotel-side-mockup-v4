import '@testing-library/jest-dom/vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { InviteTalentPage } from './invite-talent-page'

beforeEach(() => window.localStorage.clear())
afterEach(() => cleanup())

describe('InviteTalentPage', () => {
  it('requires explicit creator and campaign choices', () => {
    render(<InviteTalentPage />)

    expect(screen.getByRole('heading', { name: 'Invite a creator to a campaign' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Send invitation' })).toBeDisabled()
  })

  it('creates a pending campaign invitation without creating a collaboration', () => {
    render(<InviteTalentPage />)

    fireEvent.change(screen.getByLabelText('Creator'), { target: { value: 'daniel-kahn' } })
    fireEvent.change(screen.getByLabelText('Campaign'), { target: { value: 'coastal-escape' } })
    fireEvent.click(screen.getByRole('button', { name: 'Send invitation' }))

    expect(screen.getByRole('status')).toHaveTextContent('Invitation sent. Waiting for the creator to respond.')
    expect(screen.getByRole('status')).toHaveTextContent('Status · PENDING · Response deadline not modeled')
  })

  it('explains an existing application instead of creating an invitation', () => {
    render(<InviteTalentPage />)

    fireEvent.change(screen.getByLabelText('Creator'), { target: { value: 'sofie-larsen' } })
    fireEvent.change(screen.getByLabelText('Campaign'), { target: { value: 'coastal-escape' } })
    fireEvent.click(screen.getByRole('button', { name: 'Send invitation' }))

    expect(screen.getByRole('status')).toHaveTextContent('This creator already has an application for this campaign.')
  })
})
