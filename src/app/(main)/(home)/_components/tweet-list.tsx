'use client'

import React from 'react'

import { Separator } from '@/components/ui/separator'
import Tweet, { TweetProps } from '@/components/shared/tweet'

type Props = {
  tweets: TweetProps[] | null
}

const TweetList = ({ tweets }: Props) => {
  //   const getTweets =  (limit: number, skip: number) => {
  //     const user = await getCurrentUser()
  //     if (!user) return null
  //     const tweetsData = await getTweetsByUser({ userId: user.id, limit, skip })
  //     return tweetsData
  //   }

  //   let tweets = await getTweets(10, 0)
  //   if (!tweets) return null

  //   tweets = tweets.map((tweet) => (
  //     <React.Fragment key={tweet.id}>
  //       <Tweet {...tweet} />
  //       <Separator />
  //     </React.Fragment>
  //   ))

  return (
    <div>
      {tweets?.map((tweet) => (
        <React.Fragment key={tweet.id}>
          <Tweet {...tweet} />
          <Separator />
        </React.Fragment>
      ))}
    </div>
  )
}

export default TweetList
