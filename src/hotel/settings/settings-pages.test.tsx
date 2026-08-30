import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { AccountSettingsPage } from './account-settings-page'
import { GallerySettingsPage } from './gallery-settings-page'
import { ProfileSettingsPage } from './profile-settings-page'
import { SettingsIndexPage } from './settings-index-page'

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

  it('preserves the canonical Hotel profile fields and creator preview', () => {
    render(<ProfileSettingsPage />)

    expect(screen.getByRole('heading', { name: 'Hotel profile' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Creator preview' })).toBeInTheDocument()
    expect(screen.getByLabelText('Name')).toHaveValue('Marienlyst, Helsingør')
    expect(screen.getByLabelText('Location')).toHaveValue('Helsingør, Denmark')
    expect(screen.getByLabelText('Description')).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: 'Replace' })).toHaveLength(2)
  })

  it('preserves Gallery add/remove with the six-image limit', () => {
    render(<GallerySettingsPage />)

    expect(screen.getByRole('heading', { name: 'Gallery' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Add image' })).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: 'Remove' })).toHaveLength(4)
    expect(screen.getByText('4 / 6')).toBeInTheDocument()
  })

  it('keeps account email read-only and display name editable', () => {
    render(<AccountSettingsPage />)

    expect(screen.getByRole('heading', { name: 'Account' })).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toHaveAttribute('readonly')
    expect(screen.getByLabelText('Display name')).toHaveValue('Marienlyst Team')
  })
})
