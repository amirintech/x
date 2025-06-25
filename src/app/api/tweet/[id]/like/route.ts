import { NextRequest, NextResponse } from 'next/server'
import { likeTweet, unlikeTweet } from '@/queries/tweet'

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const { userId } = await req.json()
  if (!userId) return NextResponse.json({ error: 'userId is required' }, { status: 400 })
  await likeTweet(userId, params.id)
  return NextResponse.json({ success: true })
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { userId } = await req.json()
  if (!userId) return NextResponse.json({ error: 'userId is required' }, { status: 400 })
  await unlikeTweet(userId, params.id)
  return NextResponse.json({ success: true })
}
