import { User } from '@/types/user'

export async function getCurrentUser(): Promise<User | null> {
  const isServer = typeof window === 'undefined'

  try {
    if (isServer) {
      const { cookies } = await import('next/headers')
      const cookieStore = await cookies()
      const authCookie = cookieStore.get('token')

      // server-side request with manual cookie forwarding
      const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + '/api/users', {
        headers: {
          Cookie: `token=${authCookie?.value || ''}`,
        },
      })

      if (!res.ok) return null
      const user = await res.json()
      return extractUser(user)
    } else {
      // client-side request
      const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + '/api/users', {
        credentials: 'include',
      })

      if (!res.ok) return null
      const user = await res.json()
      return extractUser(user)
    }
  } catch (error) {
    console.error('Error fetching current user', error)
    return null
  }
}

export async function getUser(username: string): Promise<User | null> {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + '/api/users/username/' + username)
    if (!res.ok) return null
    const user = await res.json()
    return extractUser(user)
  } catch (error) {
    console.error('Error fetching user', error)
    return null
  }
}

function extractUser(user: any): User {
  return {
    id: user.id,
    username: user.username,
    name: user.name,
    joinedDate: user.createdAt,
    bio: user.bio,
    location: user.location,
    website: user.website,
    followersCount: user.followersCount,
    followingCount: user.followingCount,
    tweetsCount: user.tweetsCount,
    imageUrl: user.imageUrl,
    bannerUrl: user.bannerUrl,
    isVerified: user.isVerified,
    isLocked: user.isLocked,
  }
}
