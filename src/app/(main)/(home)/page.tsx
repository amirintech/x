import Feed from './_components/feed'

import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import TweetComposer from '@/components/shared/tweet-composer'

const Page = () => {
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
          <Separator />
          {/* feed */}
          <Feed />
        </TabsContent>

        <TabsContent value='Following'>
          {/* composer */}
          <TweetComposer />
          <Separator />
          {/* feed */}
          <Feed />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Page
