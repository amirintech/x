'use client'

import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import TweetList from '../tweet-list'
import { TweetProps } from '@/components/shared/tweet'

type Props = {}

const Feed = (props: Props) => {
  const [tweets, setTweets] = useState<TweetProps[]>([])
  const {
    data: initialTweets,
    isLoading,
    status,
  } = useQuery({
    queryKey: ['feed'],
    queryFn: () => {
      return fetch('http://localhost:8080/api/tweets', {
        credentials: 'include',
      }).then((res) => res.json())
    },
  })

  useEffect(() => {
    if (initialTweets) setTweets(initialTweets)
  }, [initialTweets])

  useEffect(() => {
    const eventSource = new EventSource(process.env.NEXT_PUBLIC_API_BASE_URL + '/api/feed', {
      withCredentials: true,
    })
    eventSource.onopen = () => {
      console.log('connected to feed')
    }
    eventSource.onerror = (event) => {
      console.error('error', event)
    }
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data)
      console.log('event source data', data)
      setTweets((prev) => [data.tweet, ...prev])
    }

    return () => eventSource.close()
  }, [])

  if (isLoading) return <div>Loading...</div>
  if (status === 'error') return <div>Error fetching tweets</div>

  return <TweetList tweets={tweets as TweetProps[]} />
}

export default Feed
