import type { ButtonHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'

const buttonVariants = cva(
  'inline-flex h-9 items-center justify-center gap-2 rounded-control px-4 text-xs font-medium transition-colors disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-partout-action text-white hover:bg-partout-action-hover',
        secondary: 'border border-partout-border bg-partout-surface text-partout-text hover:bg-partout-muted',
        quiet: 'bg-transparent text-partout-text-muted hover:bg-partout-muted hover:text-partout-text',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
)

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>

export function Button({ className, variant, type = 'button', ...props }: ButtonProps) {
  return <button type={type} className={cn(buttonVariants({ variant }), className)} {...props} />
}
