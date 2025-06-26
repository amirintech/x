'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import Input from '@/components/shared/input'

interface FormData {
  name?: string
  username?: string
  email: string
  password: string
}

type Props = {
  title: string
  type: 'sign-in' | 'create-account'
  formSchema: z.ZodSchema<FormData>
  children: React.ReactNode
}

const AuthDialog = ({ title, formSchema, children, type }: Props) => {
  let defaultValues: FormData = {
    email: '',
    password: '',
  }
  if (type === 'create-account') {
    defaultValues = {
      name: '',
      email: '',
      password: '',
      username: '',
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // console.log(values)
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) form.reset()
  }

  return (
    <Dialog onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-start'>{title}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-6 pt-6'
          >
            {/* name */}
            {type === 'create-account' && (
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        label='Name'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* username */}
            {type === 'create-account' && (
              <FormField
                control={form.control}
                name='username'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        label='Username'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* email */}
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      label='Email'
                      type='email'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* password */}
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      label='Password'
                      type='password'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              variant='secondary'
              type='submit'
              className='w-full'
            >
              Continue
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default AuthDialog
