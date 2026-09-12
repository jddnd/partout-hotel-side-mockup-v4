import { cn } from '../../lib/cn'

const portraitPalettes = [
  { backdrop: '#6f9891', skin: '#d8a07d', hair: '#30231e', clothing: '#e8dfd1' },
  { backdrop: '#6c7f77', skin: '#b98261', hair: '#211f1c', clothing: '#273b35' },
  { backdrop: '#8b7668', skin: '#c98d70', hair: '#34241f', clothing: '#2f2b29' },
  { backdrop: '#7d9286', skin: '#d5a17e', hair: '#514036', clothing: '#d2c2aa' },
  { backdrop: '#78877d', skin: '#b9795f', hair: '#29231f', clothing: '#7f684f' },
] as const

type CreatorPortraitProps = Readonly<{
  name: string
  className?: string
}>

export function CreatorPortrait({ name, className }: CreatorPortraitProps) {
  const paletteIndex = [...name].reduce((sum, character) => sum + character.charCodeAt(0), 0) % portraitPalettes.length
  const palette = portraitPalettes[paletteIndex]
  const background = [
    `radial-gradient(circle at 50% 35%, ${palette.skin} 0 12%, transparent 13%)`,
    `radial-gradient(ellipse at 50% 34%, ${palette.hair} 0 19%, transparent 20%)`,
    `radial-gradient(ellipse at 50% 88%, ${palette.clothing} 0 31%, transparent 32%)`,
    `linear-gradient(145deg, ${palette.backdrop}, color-mix(in srgb, ${palette.backdrop} 55%, #d8cbb9))`,
  ].join(', ')

  return (
    <span
      role="img"
      aria-label={`${name} portrait placeholder`}
      className={cn('block shrink-0 overflow-hidden bg-partout-muted', className)}
      style={{ background }}
    />
  )
}
