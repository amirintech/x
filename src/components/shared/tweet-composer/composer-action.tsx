import React from 'react'

import { cn } from '@/lib/utils'

type Props = {
  label: string
  icon: React.ReactNode
  onClick: () => void
  isDisabled?: boolean
}

const ComposerAction = ({ label, icon, onClick, isDisabled }: Props) => {
  return (
    <button
      type='button'
      onClick={onClick}
      className={cn(
        'hover:before:bg-accent/10 relative cursor-pointer before:absolute before:inset-0 before:scale-200 before:rounded-full',
        isDisabled && 'cursor-not-allowed opacity-50',
      )}
      disabled={isDisabled}
    >
      <div className='text-accent relative z-10'>{icon}</div>
      <span className='sr-only'>{label}</span>
    </button>
  )
}

export default ComposerAction
