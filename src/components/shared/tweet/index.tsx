'use client'

import axios from 'axios'
import { useMemo, useState } from 'react'
import Image from 'next/image'
import { HiCheckBadge } from 'react-icons/hi2'
import { Repeat2Icon, ShareIcon } from 'lucide-react'
import { GoBookmark, GoBookmarkFill, GoHeart, GoHeartFill } from 'react-icons/go'
import { LuChartNoAxesColumn } from 'react-icons/lu'
import { IoChatbubbleOutline } from 'react-icons/io5'

import TweetAction from './tweet-action'
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar'

import type { Tweet } from '@/types/tweet'
import { toast } from 'sonner'

type Props = {
  createdAt: string
  replies: number
  mediaSrcs: string[]
  id: string
  retweets: number
  views: number
  content: string
  likes: number
  updatedAt: string
  tags: string[]
  author: {
    id: string
    isVerified: boolean | null
    username: string
    imageUrl: string | null
    name: string | null
  }
  isLiked: boolean
  isRetweeted: boolean
  isBookmarked: boolean
}

const Tweet = ({
  id,
  content,
  createdAt,
  likes,
  retweets,
  replies,
  views,
  mediaSrcs,
  author,
  isRetweeted,
  isLiked,
  isBookmarked,
}: Props) => {
  const [retweeted, setRetweeted] = useState(isRetweeted)
  const [retweetsCount, setRetweetsCount] = useState(retweets)
  const [liked, setLiked] = useState(isLiked)
  const [likesCount, setLikesCount] = useState(likes)
  const [bookmarked, setBookmarked] = useState(isBookmarked)
  const [isLoading, setIsLoading] = useState(false)

  const actions = useMemo(
    () => [
      {
        label: 'Replies',
        value: replies,
        icon: <IoChatbubbleOutline size={16} />,
        onClick: () => {},
      },
      {
        label: 'Retweet',
        value: retweetsCount,
        icon: <Repeat2Icon size={18} />,
        isActive: retweeted,
        disabled: isLoading,
        onClick: async () => {
          if (isLoading) return
          setIsLoading(true)
          const previousRetweeted = retweeted
          const previousCount = retweetsCount

          setRetweeted(!retweeted)
          setRetweetsCount(retweeted ? retweetsCount - 1 : retweetsCount + 1)

          try {
            if (retweeted) await axios.delete(`/api/tweet/${id}/retweet`, { data: { userId: author.id } })
            else await axios.post(`/api/tweet/${id}/retweet`, { userId: author.id })
          } catch (error) {
            toast.error('Failed to perform action')
            setRetweeted(previousRetweeted)
            setRetweetsCount(previousCount)
          } finally {
            setIsLoading(false)
          }
        },
      },
      {
        label: 'Like',
        value: likesCount,
        icon: liked ? (
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
        isActive: liked,
        disabled: isLoading,
        onClick: async () => {
          if (isLoading) return
          setIsLoading(true)
          const previousLiked = liked
          const previousCount = likesCount

          setLiked(!liked)
          setLikesCount(liked ? likesCount - 1 : likesCount + 1)

          try {
            if (liked) {
              await axios.delete(`/api/tweet/${id}/like`, { data: { userId: author.id } })
            } else {
              await axios.post(`/api/tweet/${id}/like`, { userId: author.id })
            }
          } catch (error) {
            toast.error('Failed to perform action')
            setLiked(previousLiked)
            setLikesCount(previousCount)
          } finally {
            setIsLoading(false)
          }
        },
      },
      {
        label: 'Views',
        value: views,
        icon: <LuChartNoAxesColumn size={16} />,
        onClick: () => {},
      },
      {
        label: 'Bookmark',
        icon: bookmarked ? (
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
        isActive: bookmarked,
        disabled: isLoading,
        onClick: async () => {
          if (isLoading) return
          setIsLoading(true)
          const previousBookmarked = bookmarked

          setBookmarked(!bookmarked)

          try {
            if (bookmarked) await axios.delete(`/api/tweet/${id}/bookmark`, { data: { userId: author.id } })
            else await axios.post(`/api/tweet/${id}/bookmark`, { userId: author.id })
          } catch (error) {
            toast.error('Failed to perform action')
            setBookmarked(previousBookmarked)
          } finally {
            setIsLoading(false)
          }
        },
      },
      {
        label: 'Share',
        value: 0,
        icon: <ShareIcon size={15} />,
        onClick: () => {},
      },
    ],
    [replies, retweetsCount, likesCount, views, retweeted, liked, bookmarked, isLoading],
  )

  return (
    <article className='mx-auto grid grid-cols-[auto_1fr] gap-2 p-3'>
      {/* user avatar */}
      <Avatar className='size-10'>
        <AvatarImage src={author.imageUrl || '/images/default-profile.png'} />
        <AvatarFallback>{author.name || author.username}</AvatarFallback>
      </Avatar>

      <section>
        {/* user info */}
        <div className='text-foreground/60 flex items-center gap-1.5 text-[15px] font-medium'>
          <div className='flex items-center gap-0.5'>
            <span className='text-foreground font-bold'>{author.name || author.username}</span>
            {author.isVerified && (
              <HiCheckBadge
                size={20}
                className='text-accent'
              />
            )}
          </div>
          <span>@{author.username}</span>
          <span>&bull;</span>
          <span suppressHydrationWarning>{getTimeAgo(createdAt)}</span>
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
                className='rounded-lg object-cover'
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
              />
            ))}
          </div>
          <div className='flex items-center gap-3'>
            {actions.slice(4).map((action) => (
              <TweetAction
                key={action.label}
                {...action}
              />
            ))}
          </div>
        </div>
      </section>
    </article>
  )
}

export default Tweet

function getTimeAgo(dateString: string) {
  const date = new Date(dateString)
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
