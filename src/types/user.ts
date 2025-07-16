export type User = {
  id: string
  username: string
  name: string
  bio?: string
  location?: string
  joinedDate: string
  website?: string
  followersCount: number
  followingCount: number
  tweetsCount: number
  profilePicture?: string
  bannerPicture?: string
  isVerified: boolean
  isLocked: boolean
}
