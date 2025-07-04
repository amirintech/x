import { NextRequest } from 'next/server'
import { unfollowUser } from '@/queries/user'
import { currentUser } from '@clerk/nextjs/server'

export async function POST(request: NextRequest) {
  try {
    const clerkUser = await currentUser()
    if (!clerkUser) return new Response('Unauthorized', { status: 401 })

    const { id } = await request.json()
    if (!id) return new Response('Bad Request', { status: 400 })

    await unfollowUser({ followerId: clerkUser.id, followingId: id })

    return new Response('OK', { status: 200 })
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 })
  }
}
