'use client'

import { useState } from 'react'
import Image from 'next/image'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import Input from '@/components/shared/input'
import { Button } from '@/components/ui/button'
import { GetUserOutput } from '@/queries/user'

type Props = { children: React.ReactNode; user: GetUserOutput }

const ProfileUpdateDialog = ({ children, user }: Props) => {
  const { bannerUrl, imageUrl } = user
  const [formUser, setFormUser] = useState(user)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormUser({ ...formUser, [e.target.name]: e.target.value })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(formUser)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='flex h-full max-h-[600px] !w-full !max-w-xl items-center justify-center overflow-hidden p-0'>
        <form
          onSubmit={handleSubmit}
          className='scrollbar scrollbar-thumb-accent scrollbar-track-accent/10 h-full w-full overflow-y-auto'
        >
          <DialogHeader className='bg-background/70 sticky top-0 left-0 z-10 flex flex-row items-center justify-between p-3 backdrop-blur-3xl'>
            <Button
              size='sm'
              variant='secondary'
            >
              Save
            </Button>
            <DialogTitle>Edit profile</DialogTitle>
          </DialogHeader>

          {/* banner & profile image */}
          <div className='relative'>
            <div className='relative h-40 w-full sm:h-52'>
              {bannerUrl && (
                <Image
                  src={bannerUrl}
                  alt='Profile'
                  fill
                  className='object-cover'
                />
              )}
              {!bannerUrl && <div className='size-full bg-gradient-to-br from-violet-300 to-sky-300' />}
            </div>
            <div className='absolute bottom-0 left-3 translate-y-1/2'>
              <div className='border-background relative size-32 overflow-hidden rounded-full border-4'>
                <Image
                  src={imageUrl || '/images/default-profile.png'}
                  alt='Profile'
                  fill
                  className='object-cover'
                />
              </div>
            </div>
          </div>

          {/* form */}
          <div className='relative space-y-4 px-4 pt-[80px] pb-4'>
            <Input
              label='Name'
              value={formUser.name}
              onChange={handleChange}
              name='name'
            />

            <Input
              label='Username'
              value={formUser.username}
              onChange={handleChange}
              name='username'
            />

            <Input
              label='Bio'
              value={formUser.bio}
              onChange={handleChange}
              name='bio'
            />

            <Input
              label='Location'
              value={formUser.location}
              onChange={handleChange}
              name='location'
            />

            <Input
              label='Website'
              value={formUser.website}
              onChange={handleChange}
              name='website'
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ProfileUpdateDialog
