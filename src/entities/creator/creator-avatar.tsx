import { cn } from '../../lib/cn'

const avatarPalettes = [
  'linear-gradient(145deg, #44594c, #c8b29e)',
  'linear-gradient(145deg, #2f4039, #a68c78)',
  'linear-gradient(145deg, #775b4d, #d2b99e)',
  'linear-gradient(145deg, #3e4d48, #aab4aa)',
  'linear-gradient(145deg, #5f4b42, #c7aa86)',
] as const

const sizeClasses = {
  small: 'size-7 text-[8px]',
  medium: 'size-9 text-[9px]',
} as const

type CreatorAvatarProps = Readonly<{
  name: string
  initials: string
  size?: keyof typeof sizeClasses
  className?: string
}>

export function CreatorAvatar({ name, initials, size = 'medium', className }: CreatorAvatarProps) {
  const paletteIndex = [...name].reduce((sum, character) => sum + character.charCodeAt(0), 0) % avatarPalettes.length

  return (
    <span
      className={cn(
        'grid shrink-0 place-items-center rounded-control border border-white/60 font-semibold text-white shadow-[inset_0_0_0_1px_rgb(0_0_0/0.04)]',
        sizeClasses[size],
        className,
      )}
      style={{ background: avatarPalettes[paletteIndex] }}
      role="img"
      aria-label={name}
    >
      {initials}
    </span>
  )
}
