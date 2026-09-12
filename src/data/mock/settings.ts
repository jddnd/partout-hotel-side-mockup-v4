export const settingsProperty = {
  name: 'Marienlyst, Helsingør',
  location: 'Helsingør, Denmark',
  description:
    'A seaside hotel shaped by long summer evenings, Nordic hospitality and easy access to the water.',
  heroStatus: 'Added',
  logoStatus: 'Added',
} as const

export const settingsGallery = [
  { id: 'gallery-1', position: '22% 42%' },
  { id: 'gallery-2', position: '68% 34%' },
  { id: 'gallery-3', position: '42% 72%' },
  { id: 'gallery-4', position: '76% 66%' },
] as const

export const settingsAccount = {
  email: 'team@marienlyst.example',
  displayName: 'Marienlyst Team',
} as const

export const HOTEL_GALLERY_MAX_IMAGES = 6
