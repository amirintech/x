'use client'

import axios from 'axios'
import { toast } from 'sonner'
import { useMemo, useState } from 'react'
import { CalendarClockIcon, ImageIcon, MapPinIcon, VoteIcon } from 'lucide-react'
import { useUser } from '@clerk/nextjs'

import ComposerAction from './composer-action'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

const TweetComposer = () => {
  const [content, setContent] = useState('')
  const [mediaSrcs, setMediaSrcs] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const actions = useMemo(
    () => [
      { label: 'Media', icon: <ImageIcon size={18} />, onClick: () => console.log('media') },
      { label: 'Poll', icon: <VoteIcon size={18} />, onClick: () => console.log('poll') },
      { label: 'Schedule', icon: <CalendarClockIcon size={18} />, onClick: () => console.log('schedule') },
      { label: 'Location', icon: <MapPinIcon size={18} />, onClick: () => console.log('location') },
    ],
    [],
  )

  const { user } = useUser()
  if (!user) return null

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await axios.post('/api/tweet', {
        userId: user.id,
        content: content.trim(),
        mediaSrcs,
      })
      setContent('')
      setMediaSrcs([])
    } catch (error) {
      console.error(error)
      toast.error('Failed to create tweet')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='border-b p-3'>
      <div className='mx-auto grid max-w-[560px] grid-cols-[auto_1fr] gap-2'>
        <Avatar className='size-10'>
          <AvatarImage src={user.imageUrl || '/images/default-profile.png'} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <form onSubmit={handleSubmit}>
          <Textarea
            placeholder='What is happening?'
            className='caret-accent resize-none rounded-none border-none !bg-transparent p-0 !text-xl shadow-none focus-visible:ring-0'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={isLoading}
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
            <Button
              disabled={isLoading}
              size='sm'
            >
              {isLoading ? 'Tweeting...' : 'Tweet'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TweetComposer
