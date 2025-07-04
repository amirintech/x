import { NextRequest, NextResponse } from 'next/server'
import { upsertTweet, getTweetsByUser, deleteTweet } from '@/queries/tweet'
import { deleteTweetSchema, upsertTweetSchema } from '@/validators/tweet'

// POST: Create a new tweet
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    body.id = crypto.randomUUID()
    const validatedBody = upsertTweetSchema.parse(body)
    const tweet = await upsertTweet(validatedBody)
    return NextResponse.json({ tweet }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 })
  }
}

// GET: Get tweets by user with pagination
export async function GET(req: NextRequest) {
  console.log('API GET: ', req.nextUrl.searchParams)
  try {
    console.log('API GET: ', req.nextUrl.searchParams)
    const searchParams = req.nextUrl.searchParams
    const userId = searchParams.get('userId')
    const limit = parseInt(searchParams.get('limit') || '10', 10)
    const skip = parseInt(searchParams.get('skip') || '0', 10)
    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 })
    }
    const tweets = await getTweetsByUser({ userId, limit, skip })
    console.log('API GET: ', tweets)
    return NextResponse.json({ tweets }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 })
  }
}

// PUT: Update a tweet (upsert)
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    const validatedBody = upsertTweetSchema.parse(body)
    if (!body.id) {
      return NextResponse.json({ error: 'id is required for update' }, { status: 400 })
    }
    const tweet = await upsertTweet(validatedBody)
    return NextResponse.json({ tweet })
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 })
  }
}

// DELETE: Delete a tweet
export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json()
    const validatedBody = deleteTweetSchema.parse(body)
    const tweet = await deleteTweet(validatedBody.id, validatedBody.userId)
    return NextResponse.json({ tweet })
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 })
  }
}
