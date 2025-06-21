export type Tweet = {
  id: string
  content?: string
  createdAt: Date
  updatedAt: Date
  likes: number
  retweets: number
  replies: number
  views: number
  tags: string[]
  mediaSrcs?: string[]
}
