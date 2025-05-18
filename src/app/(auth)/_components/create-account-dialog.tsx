'use client'

import { z } from 'zod'

import AuthDialog from './auth_dialog'
import { Button } from '@/components/ui/button'

const formSchema = z.object({
  name: z.string({ required_error: 'Name is required' }),
  username: z.string({ required_error: 'Username is required' }),
  email: z.string({ required_error: 'Email is required' }).email({ message: 'Invalid email address' }),
  password: z
    .string({ required_error: 'Password is required' })
    .min(8, { message: 'Password must be at least 8 characters long' }),
})

const CreateAccountDialog = () => {
  return (
    <AuthDialog
      title='Create account'
      type='create-account'
      formSchema={formSchema}
    >
      <Button className='w-full'>Create account</Button>
    </AuthDialog>
  )
}

export default CreateAccountDialog
