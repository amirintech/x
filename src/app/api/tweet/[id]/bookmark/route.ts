import { NextRequest, NextResponse } from 'next/server'
import { bookmarkTweet, unbookmarkTweet } from '@/queries/tweet'

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const { userId } = await req.json()
  if (!userId) return NextResponse.json({ error: 'userId is required' }, { status: 400 })
  await bookmarkTweet(userId, params.id)
  return NextResponse.json({ success: true })
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { userId } = await req.json()
  if (!userId) return NextResponse.json({ error: 'userId is required' }, { status: 400 })
  await unbookmarkTweet(userId, params.id)
  return NextResponse.json({ success: true })
}
