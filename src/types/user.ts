export type User = {
  id: string
  username: string
  name: string
  bio?: string
  location?: string
  joinedDate: Date
  website?: string
  followersCount: number
  followingCount: number
  postsCount: number
  imageUrl?: string
  bannerUrl?: string
}
