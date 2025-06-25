import { NextRequest, NextResponse } from 'next/server'
import { retweetTweet, unretweetTweet } from '@/queries/tweet'

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const { userId } = await req.json()
  console.log('userId', userId)
  if (!userId) return NextResponse.json({ error: 'userId is required' }, { status: 400 })
  await retweetTweet(userId, params.id)
  return NextResponse.json({ success: true })
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { userId } = await req.json()
  if (!userId) return NextResponse.json({ error: 'userId is required' }, { status: 400 })
  await unretweetTweet(userId, params.id)
  return NextResponse.json({ success: true })
}
