'use client'

import { useMemo } from 'react'
import Image from 'next/image'
import { HiCheckBadge } from 'react-icons/hi2'

import TweetAction from './tweet-action'
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar'

import type { Tweet } from '@/types/tweet'
import { Repeat2Icon, ShareIcon } from 'lucide-react'
import { GoBookmark, GoBookmarkFill, GoHeart, GoHeartFill } from 'react-icons/go'
import { LuChartNoAxesColumn } from 'react-icons/lu'
import { IoChatbubbleOutline } from 'react-icons/io5'

type Props = {
  tweet: Tweet
  name: string
  profilePicture: string
  username: string
  isRetweeted: boolean
  isLiked: boolean
  isBookmarked: boolean
  isUserVerified: boolean
}

const Tweet = ({
  tweet: { content, createdAt, likes, retweets, replies, views, mediaSrcs },
  name,
  profilePicture,
  username,
  isRetweeted,
  isLiked,
  isBookmarked,
  isUserVerified,
}: Props) => {
  const actions = useMemo(
    () => [
      {
        label: 'Replies',
        value: replies,
        icon: <IoChatbubbleOutline size={16} />,
      },
      {
        label: 'Retweet',
        value: retweets,
        icon: <Repeat2Icon size={18} />,
        isActive: isRetweeted,
      },
      {
        label: 'Like',
        value: likes,
        icon: isLiked ? (
          <GoHeartFill
            size={16}
            className='stroke-[0.5px]'
          />
        ) : (
          <GoHeart
            size={16}
            className='stroke-[0.5px]'
          />
        ),
        isActive: true,
      },
      {
        label: 'Views',
        value: views,
        icon: <LuChartNoAxesColumn size={16} />,
      },
      {
        label: 'Bookmark',
        icon: isBookmarked ? (
          <GoBookmarkFill
            size={16}
            className='stroke-[0.5px]'
          />
        ) : (
          <GoBookmark
            size={16}
            className='stroke-[0.5px]'
          />
        ),
        isActive: isBookmarked,
      },
      {
        label: 'Share',
        value: 0,
        icon: <ShareIcon size={15} />,
      },
    ],
    [],
  )

  return (
    <article className='mx-auto grid max-w-[560px] grid-cols-[auto_1fr] gap-2'>
      {/* user avatar */}
      <Avatar className='size-10'>
        <AvatarImage src={profilePicture} />
        <AvatarFallback>{name}</AvatarFallback>
      </Avatar>

      <section>
        {/* user info */}
        <div className='flex items-center gap-1.5 text-[15px] font-medium text-slate-600'>
          <div className='flex items-center gap-0.5'>
            <span className='text-foreground font-bold'>{name}</span>
            {isUserVerified && (
              <HiCheckBadge
                size={20}
                className='text-accent'
              />
            )}
          </div>
          <span>@{username}</span>
          <span>&bull;</span>
          <span>{getTimeAgo(createdAt)}</span>
        </div>

        {/* tweet content */}
        <div>
          {content && <p>{content}</p>}
          {mediaSrcs && mediaSrcs.length > 0 && (
            <div className='relative mt-2 h-96 w-full'>
              <Image
                src={mediaSrcs[0]}
                alt='tweet media'
                fill
                className='rounded-lg'
              />
            </div>
          )}
        </div>

        {/* tweet actions */}
        <div className='mt-3 flex items-center'>
          <div className='grid flex-1 grid-cols-4 items-center justify-items-start'>
            {actions.slice(0, 4).map((action) => (
              <TweetAction
                key={action.label}
                {...action}
                onClick={() => console.log(action.label)}
              />
            ))}
          </div>
          <div className='flex items-center gap-3'>
            {actions.slice(4).map((action) => (
              <TweetAction
                key={action.label}
                {...action}
                onClick={() => console.log(action.label)}
              />
            ))}
          </div>
        </div>
      </section>
    </article>
  )
}

export default Tweet

function getTimeAgo(date: Date) {
  const now = new Date()
  const diff = (now.getTime() - date.getTime()) / 1000 // seconds
  if (diff < 60) return `${Math.floor(diff)}s`
  if (diff < 3600) return `${Math.floor(diff / 60)}m`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`
  if (diff < 2592000) return `${Math.floor(diff / 86400)}d`
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' }
  if (now.getFullYear() !== date.getFullYear()) {
    options.year = 'numeric'
  }
  return date.toLocaleDateString(undefined, options)
}
