import Tweet from '@/components/shared/tweet'
import { Separator } from '@/components/ui/separator'

const Page = () => {
  return (
    <div className='space-y-4 py-4'>
      <Tweet
        tweet={{
          id: '1',
          content: 'Hello, world!',
          createdAt: new Date(2025, 5, 20, 12, 0, 0),
          updatedAt: new Date(2025, 5, 20, 12, 0, 0),
          likes: 10234,
          retweets: 2331183,
          replies: 291,
          views: 298283,
          tags: [],

          mediaSrcs: [
            'https://images.unsplash.com/photo-1749746766499-78e86d4d89e6?q=80&w=2116&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          ],
        }}
        name='Watcher.Guru'
        profilePicture='https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        username='WatcherGuru'
        isRetweeted
        isLiked
        isBookmarked
        isUserVerified
      />

      <Separator />

      <Tweet
        tweet={{
          id: '1',
          content: 'Hello, world!',
          createdAt: new Date(2025, 5, 20, 12, 0, 0),
          updatedAt: new Date(2025, 5, 20, 12, 0, 0),
          likes: 10234,
          retweets: 2331183,
          replies: 291,
          views: 298283,
          tags: [],

          mediaSrcs: [
            'https://images.unsplash.com/photo-1749746766499-78e86d4d89e6?q=80&w=2116&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          ],
        }}
        name='Watcher.Guru'
        profilePicture='https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        username='WatcherGuru'
        isRetweeted
        isLiked
        isBookmarked
        isUserVerified
      />
    </div>
  )
}

export default Page
