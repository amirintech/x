import { Button } from '@/components/ui/button'
import React from 'react'

type Props = {
  label: string
  icon: React.ReactNode
  onClick: () => void
}

const ComposerAction = ({ label, icon, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className='hover:before:bg-accent/10 relative cursor-pointer before:absolute before:inset-0 before:scale-200 before:rounded-full'
    >
      <div className='text-accent relative z-10'>{icon}</div>
      <span className='sr-only'>{label}</span>
    </button>
  )
}

export default ComposerAction
