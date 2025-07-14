import { User } from '@/types/user'

export async function getCurrentUser(): Promise<User | null> {
  const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + '/api/users', {
    credentials: 'include', // HTTP only cookie
  })
  if (!res.ok) return null

  const user = await res.json()

  return {
    id: user.id,
    username: user.username,
    name: user.name,
    joinedDate: user.joinedDate,
    bio: user.bio,
    location: user.location,
    website: user.website,
    followersCount: user.followersCount,
    followingCount: user.followingCount,
    postsCount: user.postsCount,
    imageUrl: user.imageUrl,
    bannerUrl: user.bannerUrl,
    isVerified: user.isVerified,
  }
}
