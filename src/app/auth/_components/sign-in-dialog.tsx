'use client'

import { z } from 'zod'

import AuthDialog from './auth_dialog'

import { Button } from '@/components/ui/button'

const formSchema = z.object({
  email: z.string({ required_error: 'Email is required' }).email({ message: 'Invalid email address' }),
  password: z
    .string({ required_error: 'Password is required' })
    .min(8, { message: 'Password must be at least 8 characters long' }),
})

const SignInDialog = () => {
  return (
    <AuthDialog
      title='Sign in'
      type='sign-in'
      formSchema={formSchema}
    >
      <Button
        variant='outline'
        className='w-full'
      >
        Sign in
      </Button>
    </AuthDialog>
  )
}
export default SignInDialog
