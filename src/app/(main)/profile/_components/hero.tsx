'use client'

import Image from 'next/image'
import { CalendarIcon, LinkIcon, MapPinIcon } from 'lucide-react'

import ProfileUpdateDialog from './profile-update-dialog'

import { Button } from '@/components/ui/button'
import { followUser, GetUserOutput } from '@/queries/user'
import FollowButton from './follow-button'

interface Props {
  user: GetUserOutput
  isCurrentUser: boolean
  currentUser: GetUserOutput
}

const Hero = ({ user, isCurrentUser, currentUser }: Props) => {
  const { username, name, bio, location, website, joinedDate, followersCount, followingCount, imageUrl, bannerUrl } =
    user

  return (
    <section>
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

      <div className='relative'>
        {/* edit profile button */}
        {isCurrentUser && (
          <ProfileUpdateDialog user={user}>
            <Button
              variant='secondary'
              className='absolute top-3 right-3'
            >
              Edit profile
            </Button>
          </ProfileUpdateDialog>
        )}

        {/* follow button */}
        {!isCurrentUser && (
          <FollowButton
            user={user}
            currentUser={currentUser}
          />
        )}

        {/* profile info */}
        <div className='space-y-3 px-3 pt-[72px] text-sm'>
          {/* name & username */}
          <div className='flex flex-col gap-y-1'>
            <span className='text-lg leading-none font-extrabold'>{name}</span>
            <span className='text-foreground/60'>@{username}</span>
          </div>

          {/* bio */}
          <p className='text-foreground'>{bio}</p>

          {/* other info */}
          <div className='flex flex-wrap items-center gap-x-3 gap-y-1'>
            {location && (
              <div className='text-foreground/60 flex items-center gap-1'>
                <MapPinIcon className='size-4' />
                <span>{location}</span>
              </div>
            )}

            <div className='text-foreground/60 flex items-center gap-1'>
              <CalendarIcon className='size-4' />
              <span>Joined {new Date(joinedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
            </div>

            {website && (
              <div className='text-foreground/60 flex items-center gap-1'>
                <LinkIcon className='size-4' />
                <a
                  target='_blank'
                  href={website}
                  className='text-accent hover:underline'
                >
                  {website}
                </a>
              </div>
            )}
          </div>

          {/* following & followers */}
          <div className='flex items-center gap-3'>
            <span className='cursor-pointer hover:underline'>
              <span className='font-bold'>{followersCount}</span> followers
            </span>
            <span className='cursor-pointer hover:underline'>
              <span className='font-bold'>{followingCount}</span> following
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
