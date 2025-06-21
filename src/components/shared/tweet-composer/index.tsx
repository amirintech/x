'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useMemo } from 'react'
import { IoCalendarOutline, IoImageOutline, IoListOutline } from 'react-icons/io5'
import ComposerAction from './composer-action'
import { CalendarClockIcon, ImageIcon, MapPinIcon, VoteIcon } from 'lucide-react'

type Props = {}

const TweetComposer = (props: Props) => {
  const actions = useMemo(
    () => [
      { label: 'Media', icon: <ImageIcon size={18} />, onClick: () => console.log('media') },
      { label: 'Poll', icon: <VoteIcon size={18} />, onClick: () => console.log('poll') },
      { label: 'Schedule', icon: <CalendarClockIcon size={18} />, onClick: () => console.log('schedule') },
      { label: 'Location', icon: <MapPinIcon size={18} />, onClick: () => console.log('location') },
    ],
    [],
  )

  return (
    <div className='border-b p-3'>
      <div className='mx-auto grid max-w-[560px] grid-cols-[auto_1fr] gap-2'>
        <Avatar className='size-10'>
          <AvatarImage src='https://github.com/shadcn.png' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div>
          <Textarea
            placeholder='What is happening?'
            className='caret-accent resize-none rounded-none border-none !bg-transparent p-0 !text-xl shadow-none focus-visible:ring-0'
          />

          <div className='flex items-center justify-between'>
            {/* compose actions */}
            <div className='flex items-center gap-4'>
              {actions.map((action) => (
                <ComposerAction
                  key={action.label}
                  {...action}
                />
              ))}
            </div>

            {/* tweet button */}
            <Button size='sm'>Tweet</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TweetComposer
