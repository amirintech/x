import { ArrowLeftIcon } from 'lucide-react'
import { notFound } from 'next/navigation'

import Hero from '../_components/hero'

import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getCurrentUser } from '@/lib/user'
import { getUser, GetUserOutput } from '@/queries/user'

const Page = async ({ params }: { params: Promise<{ username: string }> }) => {
  const { username } = await params
  const currentUser = await getCurrentUser()
  if (!currentUser) return notFound()

  const isCurrentUser = currentUser.username === username
  let otherUser: GetUserOutput | null = null
  if (!isCurrentUser) {
    otherUser = await getUser({ username, requesterId: currentUser.id })
    if (!otherUser) return notFound()
  }

  const user = isCurrentUser ? currentUser : otherUser!

  return (
    <div>
      {/* header */}
      <header className='bg-background/70 sticky top-0 z-10 flex items-center gap-6 border-b px-3 py-2 backdrop-blur-3xl'>
        <Button
          variant='ghost'
          size='icon'
          aria-label='Back'
        >
          <ArrowLeftIcon />
        </Button>

        <div className='flex flex-col items-start justify-center'>
          <span className='text-lg leading-none font-bold'>{user.name}</span>
          <span className='text-foreground/60 text-sm'>{user.postsCount} posts</span>
        </div>
      </header>

      {/* hero */}
      <Hero
        user={user}
        isCurrentUser={isCurrentUser}
        currentUser={currentUser}
      />

      {/* tabs */}
      <Tabs defaultValue='Tweets'>
        <TabsList>
          <TabsTrigger value='Tweets'>Tweets</TabsTrigger>
          <TabsTrigger value='Replies'>Replies</TabsTrigger>
          <TabsTrigger value='Media'>Media</TabsTrigger>
          <TabsTrigger value='Likes'>Likes</TabsTrigger>
        </TabsList>
        <TabsContent value='Tweets'></TabsContent>
        <TabsContent value='Replies'>Here are the replies</TabsContent>
        <TabsContent value='Media'>Here are the media</TabsContent>
        <TabsContent value='Likes'></TabsContent>
      </Tabs>
    </div>
  )
}

export default Page
