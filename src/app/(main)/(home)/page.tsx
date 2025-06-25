import React, { useState } from 'react'
import Tweet from '@/components/shared/tweet'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import TweetComposer from '@/components/shared/tweet-composer'
import { getCurrentUser } from '@/lib/user'
import { getTweetsByUser } from '@/queries/tweet'

const Page = async () => {
  const getTweets = async (limit: number, skip: number) => {
    const user = await getCurrentUser()
    if (!user) return null
    const tweetsData = await getTweetsByUser({ userId: user.id, limit, skip })
    return tweetsData
  }

  let tweets = await getTweets(10, 0)
  if (!tweets) return null

  tweets = tweets.map((tweet) => (
    <React.Fragment key={tweet.id}>
      <Tweet {...tweet} />
      <Separator />
    </React.Fragment>
  ))

  return (
    <div className='space-y-3'>
      <Tabs defaultValue='For you'>
        <TabsList className='sticky top-0'>
          <TabsTrigger value='For you'>For you</TabsTrigger>
          <TabsTrigger value='Following'>Following</TabsTrigger>
        </TabsList>

        <TabsContent value='For you'>
          {/* composer */}
          <TweetComposer />
          {/* feed */}
          <section>{tweets}</section>
        </TabsContent>

        <TabsContent value='Following'>
          {/* composer */}
          <TweetComposer />
          {/* feed */}
          <section>{tweets}</section>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Page
