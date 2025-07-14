'use client'

import { Button } from '@/components/ui/button'

type OAuthButtonProps = {
  children: React.ReactNode
}

const OAuthButton = ({ children }: OAuthButtonProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    window.location.href = 'http://localhost:8080/api/oauth/login'
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='w-full'
    >
      <Button
        variant='secondary'
        type='submit'
        className='w-full'
      >
        {children}
      </Button>
    </form>
  )
}

export default OAuthButton
