import Image from 'next/image'
import { CalendarIcon, LinkIcon, MapPinIcon } from 'lucide-react'
import { User } from '@/types/user'

interface Props {
  user: User
}

const Hero = ({
  user: { username, name, postsCount, bio, location, joinedDate, website, followersCount, followingCount },
}: Props) => {
  return (
    <section>
      {/* banner & profile image */}
      <div className='relative'>
        <div className='relative h-40 w-full sm:h-56'>
          <Image
            src='https://images.unsplash.com/photo-1749838065282-32db54bed154?q=80&w=2729&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            alt='Profile'
            fill
            className='object-cover'
          />
        </div>
        <div className='absolute bottom-0 left-3 translate-y-1/2'>
          <div className='border-background relative size-32 overflow-hidden rounded-full border-4'>
            <Image
              src='https://images.unsplash.com/photo-1580638511809-d3200a16c355?q=80&w=1812&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              alt='Profile'
              fill
              className='object-cover'
            />
          </div>
        </div>
      </div>

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
          <div className='text-foreground/60 flex items-center gap-1'>
            <MapPinIcon className='size-4' />
            <span>{location}</span>
          </div>

          <div className='text-foreground/60 flex items-center gap-1'>
            <CalendarIcon className='size-4' />
            <span>Joined {joinedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
          </div>

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
    </section>
  )
}

export default Hero
