import {
  HOTEL_GALLERY_MAX_IMAGES,
  settingsAccount,
  settingsGallery,
  settingsProperty,
} from '../../data/mock/settings'

const PROFILE_KEY = 'partout-hotel-mockup-settings-profile-v1'
const ACCOUNT_KEY = 'partout-hotel-mockup-settings-account-v1'
const GALLERY_KEY = 'partout-hotel-mockup-settings-gallery-v1'

export type MockSettingsProfile = Readonly<{
  name: string
  location: string
  description: string
  heroPresent: boolean
  logoPresent: boolean
}>

export type MockSettingsAccount = Readonly<{
  email: string
  displayName: string
}>

export type MockSettingsGalleryItem = Readonly<{
  id: string
  position: string
}>

const defaultProfile: MockSettingsProfile = {
  name: settingsProperty.name,
  location: settingsProperty.location,
  description: settingsProperty.description,
  heroPresent: settingsProperty.heroStatus === 'Added',
  logoPresent: settingsProperty.logoStatus === 'Added',
}

function readJson<T>(key: string): T | null {
  if (typeof window === 'undefined') return null

  try {
    const value = window.localStorage.getItem(key)
    return value ? (JSON.parse(value) as T) : null
  } catch {
    return null
  }
}

function writeJson(key: string, value: unknown) {
  if (typeof window === 'undefined') return

  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // The workbench stays usable even when browser storage is unavailable.
  }
}

export function getMockSettingsProfile(): MockSettingsProfile {
  const stored = readJson<Partial<MockSettingsProfile>>(PROFILE_KEY)
  if (!stored) return defaultProfile

  return {
    name: typeof stored.name === 'string' ? stored.name : defaultProfile.name,
    location: typeof stored.location === 'string' ? stored.location : defaultProfile.location,
    description: typeof stored.description === 'string' ? stored.description : defaultProfile.description,
    heroPresent: typeof stored.heroPresent === 'boolean' ? stored.heroPresent : defaultProfile.heroPresent,
    logoPresent: typeof stored.logoPresent === 'boolean' ? stored.logoPresent : defaultProfile.logoPresent,
  }
}

export function saveMockSettingsProfile(profile: MockSettingsProfile) {
  writeJson(PROFILE_KEY, profile)
}

export function getMockSettingsAccount(): MockSettingsAccount {
  const stored = readJson<Partial<MockSettingsAccount>>(ACCOUNT_KEY)
  return {
    email: settingsAccount.email,
    displayName:
      stored && typeof stored.displayName === 'string'
        ? stored.displayName
        : settingsAccount.displayName,
  }
}

export function saveMockSettingsAccount(account: MockSettingsAccount) {
  writeJson(ACCOUNT_KEY, { displayName: account.displayName })
}

export function getMockSettingsGallery(): ReadonlyArray<MockSettingsGalleryItem> {
  const stored = readJson<ReadonlyArray<MockSettingsGalleryItem>>(GALLERY_KEY)
  if (!Array.isArray(stored)) return settingsGallery.map((item) => ({ ...item }))

  return stored
    .filter(
      (item): item is MockSettingsGalleryItem =>
        Boolean(item) && typeof item.id === 'string' && typeof item.position === 'string',
    )
    .slice(0, HOTEL_GALLERY_MAX_IMAGES)
}

export function saveMockSettingsGallery(items: ReadonlyArray<MockSettingsGalleryItem>) {
  writeJson(
    GALLERY_KEY,
    items.slice(0, HOTEL_GALLERY_MAX_IMAGES).map(({ id, position }) => ({ id, position })),
  )
}
