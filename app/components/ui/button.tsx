import { cn } from '@/app/lib/utils'
import React from 'react'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
}
export default function Button({
  children,
  variant = 'primary',
  ...props
}: Props) {
  return (
    <button
      {...props}
      className={cn(
        'p-3 text-white rounded-xl font-bold whitespace-nowrap hover:opacity-95 disabled:opacity-70',
        variant === 'primary' && 'bg-accent-purple',
        variant === 'secondary' && 'bg-background-tertiary',
        variant === 'ghost' && 'border-border-primary',
        props.className
      )}
    >
      {children}
    </button>
  )
}
