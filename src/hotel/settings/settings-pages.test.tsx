import '@testing-library/jest-dom/vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { AccountSettingsPage } from './account-settings-page'
import { GallerySettingsPage } from './gallery-settings-page'
import { ProfileSettingsPage } from './profile-settings-page'
import { SettingsIndexPage } from './settings-index-page'

beforeEach(() => window.localStorage.clear())
afterEach(() => cleanup())

describe('Hotel Settings', () => {
  it('keeps the settings index bounded to canonical capabilities', () => {
    render(<SettingsIndexPage />)

    expect(screen.getByRole('heading', { name: 'Settings' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Hotel profile/ })).toHaveAttribute('href', '/hotel/settings/profile')
    expect(screen.getByRole('link', { name: /Gallery/ })).toHaveAttribute('href', '/hotel/settings/gallery')
    expect(screen.getByRole('link', { name: /Account/ })).toHaveAttribute('href', '/hotel/settings/account')
    expect(screen.queryByText('Notifications')).not.toBeInTheDocument()
    expect(screen.queryByText('Team & access')).not.toBeInTheDocument()
  })

  it('keeps the creator preview live and only exposes profile actions after a change', () => {
    render(<ProfileSettingsPage />)

    expect(screen.getByRole('heading', { name: 'Hotel profile' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Creator preview' })).toBeInTheDocument()
    expect(screen.getByLabelText('Name')).toHaveValue('Marienlyst, Helsingør')
    expect(screen.getByLabelText('Location')).toHaveValue('Helsingør, Denmark')
    expect(screen.getByLabelText('Description')).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: 'Replace' })).toHaveLength(2)
    expect(screen.queryByRole('button', { name: 'Save changes' })).not.toBeInTheDocument()

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Marienlyst Seaside' } })

    expect(screen.getByRole('heading', { name: 'Marienlyst Seaside' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Save changes' })).toBeInTheDocument()
    expect(screen.getByText('Unsaved changes')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }))
    expect(screen.getByLabelText('Name')).toHaveValue('Marienlyst, Helsingør')
    expect(screen.queryByRole('button', { name: 'Save changes' })).not.toBeInTheDocument()
  })

  it('makes Gallery add/remove state real within the six-image limit', () => {
    render(<GallerySettingsPage />)

    expect(screen.getByRole('heading', { name: 'Gallery' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Add image' })).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: 'Remove' })).toHaveLength(4)
    expect(screen.getByText('4 / 6')).toBeInTheDocument()

    fireEvent.click(screen.getAllByRole('button', { name: 'Remove' })[0])
    expect(screen.getAllByRole('button', { name: 'Remove' })).toHaveLength(3)
    expect(screen.getByText('3 / 6')).toBeInTheDocument()
  })

  it('keeps account email read-only and only exposes save actions when display name changes', () => {
    render(<AccountSettingsPage />)

    expect(screen.getByRole('heading', { name: 'Account' })).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toHaveAttribute('readonly')
    expect(screen.getByLabelText('Display name')).toHaveValue('Marienlyst Team')
    expect(screen.queryByRole('button', { name: 'Save changes' })).not.toBeInTheDocument()

    fireEvent.change(screen.getByLabelText('Display name'), { target: { value: 'Estelle' } })
    expect(screen.getByRole('button', { name: 'Save changes' })).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Save changes' }))
    expect(screen.queryByRole('button', { name: 'Save changes' })).not.toBeInTheDocument()
    expect(screen.getByLabelText('Display name')).toHaveValue('Estelle')
  })
})
