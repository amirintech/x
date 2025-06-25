import driver from '@/lib/db'
import { Tweet } from '@/types/tweet'

// Helper function to ensure atomic operations on tweet counts
async function atomicUpdateTweetCount(
  tweetId: string,
  field: 'likes' | 'retweets' | 'bookmarks',
  operation: 'increment' | 'decrement',
): Promise<number> {
  const session = driver.session()
  const tx = session.beginTransaction()
  try {
    const result = await tx.run(
      `
      MATCH (t:Tweet { id: $tweetId })
      SET t.${field} = t.${field} ${operation === 'increment' ? '+' : '-'} 1
      RETURN t.${field} as newCount
      `,
      { tweetId },
    )
    await tx.commit()
    return result.records[0]?.get('newCount') || 0
  } catch (error) {
    await tx.rollback()
    throw error
  } finally {
    await session.close()
  }
}

export type UpsertTweetInput = {
  id: string
  userId: string
  content?: string
  tags?: string[]
  mediaSrcs?: string[]
}

export async function upsertTweet({
  id,
  userId,
  content,
  tags = [],
  mediaSrcs = [],
}: UpsertTweetInput): Promise<Tweet> {
  const session = driver.session()
  try {
    const now = new Date().toISOString()
    const result = await session.run(
      `
      MERGE (t:Tweet { id: $id })
      ON CREATE SET t.createdAt = $now, t.likes = 0, t.retweets = 0, t.replies = 0, t.views = 0, t.bookmarks = 0
      SET t.content = $content,
          t.updatedAt = $now,
          t.tags = $tags,
          t.mediaSrcs = $mediaSrcs
      WITH t
      MATCH (u:User { id: $userId })
      MERGE (u)-[:TWEETED]->(t)
      RETURN t
      `,
      { id, userId, content, tags, mediaSrcs, now },
    )
    const record = result.records[0]
    return record ? record.get('t').properties : null
  } finally {
    await session.close()
  }
}

export async function deleteTweet(id: string, userId: string): Promise<void> {
  const session = driver.session()
  try {
    await session.run(
      `
      MATCH (u:User { id: $userId })-[:TWEETED]->(t:Tweet { id: $id })
      DETACH DELETE t
      `,
      { id, userId },
    )
  } finally {
    await session.close()
  }
}

export type GetTweetsByUserInput = {
  userId: string
  limit?: number
  skip?: number
}

export async function getTweetsByUser({ userId, limit = 10, skip = 0 }: GetTweetsByUserInput): Promise<any[]> {
  const session = driver.session()
  try {
    // Ensure limit and skip are integers
    const intLimit = parseInt(String(limit), 10)
    const intSkip = parseInt(String(skip), 10)
    const result = await session.run(
      `
      MATCH (author:User)-[:TWEETED]->(t:Tweet)
      WHERE author.id = $userId
      OPTIONAL MATCH (requester:User {id: $userId})
      RETURN t, 
        author {
          .id, .name, .username, .isVerified, .imageUrl
        } AS author,
        EXISTS( (requester)-[:LIKED]->(t) ) AS isLiked,
        EXISTS( (requester)-[:RETWEETED]->(t) ) AS isRetweeted,
        EXISTS( (requester)-[:BOOKMARKED]->(t) ) AS isBookmarked
      ORDER BY t.createdAt DESC
      SKIP toInteger($skip)
      LIMIT toInteger($limit)
      `,
      { userId, limit: intLimit, skip: intSkip },
    )

    return result.records.map((r) => {
      const tweet = r.get('t').properties
      const author = r.get('author')
      return {
        ...tweet,
        author,
        isLiked: r.get('isLiked'),
        isRetweeted: r.get('isRetweeted'),
        isBookmarked: r.get('isBookmarked'),
      }
    })
  } finally {
    await session.close()
  }
}

export async function likeTweet(userId: string, tweetId: string): Promise<void> {
  const session = driver.session()
  const tx = session.beginTransaction()
  try {
    const now = new Date().toISOString()
    await tx.run(
      `
      MATCH (u:User { id: $userId }), (t:Tweet { id: $tweetId })
      WITH u, t
      OPTIONAL MATCH (u)-[existing:LIKED]->(t)
      WITH u, t, existing
      WHERE existing IS NULL
      CREATE (u)-[l:LIKED]->(t)
      SET l.createdAt = $now
      WITH t
      SET t.likes = t.likes + 1
      RETURN t.likes
      `,
      { userId, tweetId, now },
    )
    await tx.commit()
  } catch (error) {
    await tx.rollback()
    throw error
  } finally {
    await session.close()
  }
}

export async function unlikeTweet(userId: string, tweetId: string): Promise<void> {
  const session = driver.session()
  const tx = session.beginTransaction()
  try {
    await tx.run(
      `
      MATCH (u:User { id: $userId })-[l:LIKED]->(t:Tweet { id: $tweetId })
      DELETE l
      WITH t
      SET t.likes = t.likes - 1
      RETURN t.likes
      `,
      { userId, tweetId },
    )
    await tx.commit()
  } catch (error) {
    await tx.rollback()
    throw error
  } finally {
    await session.close()
  }
}

export async function retweetTweet(userId: string, tweetId: string): Promise<void> {
  const session = driver.session()
  const tx = session.beginTransaction()
  try {
    const now = new Date().toISOString()
    await tx.run(
      `
      MATCH (u:User { id: $userId }), (t:Tweet { id: $tweetId })
      WITH u, t
      OPTIONAL MATCH (u)-[existing:RETWEETED]->(t)
      WITH u, t, existing
      WHERE existing IS NULL
      CREATE (u)-[r:RETWEETED]->(t)
      SET r.createdAt = $now
      WITH t
      SET t.retweets = t.retweets + 1
      RETURN t.retweets
      `,
      { userId, tweetId, now },
    )
    await tx.commit()
  } catch (error) {
    await tx.rollback()
    throw error
  } finally {
    await session.close()
  }
}

export async function unretweetTweet(userId: string, tweetId: string): Promise<void> {
  const session = driver.session()
  const tx = session.beginTransaction()
  try {
    await tx.run(
      `
      MATCH (u:User { id: $userId })-[r:RETWEETED]->(t:Tweet { id: $tweetId })
      DELETE r
      WITH t
      SET t.retweets = t.retweets - 1
      RETURN t.retweets
      `,
      { userId, tweetId },
    )
    await tx.commit()
  } catch (error) {
    await tx.rollback()
    throw error
  } finally {
    await session.close()
  }
}

export async function bookmarkTweet(userId: string, tweetId: string): Promise<void> {
  const session = driver.session()
  const tx = session.beginTransaction()
  try {
    const now = new Date().toISOString()
    await tx.run(
      `
      MATCH (u:User { id: $userId }), (t:Tweet { id: $tweetId })
      WITH u, t
      OPTIONAL MATCH (u)-[existing:BOOKMARKED]->(t)
      WITH u, t, existing
      WHERE existing IS NULL
      CREATE (u)-[b:BOOKMARKED]->(t)
      SET b.createdAt = $now
      WITH t
      SET t.bookmarks = t.bookmarks + 1
      RETURN t.bookmarks
      `,
      { userId, tweetId, now },
    )
    await tx.commit()
  } catch (error) {
    await tx.rollback()
    throw error
  } finally {
    await session.close()
  }
}

export async function unbookmarkTweet(userId: string, tweetId: string): Promise<void> {
  const session = driver.session()
  const tx = session.beginTransaction()
  try {
    await tx.run(
      `
      MATCH (u:User { id: $userId })-[b:BOOKMARKED]->(t:Tweet { id: $tweetId })
      DELETE b
      WITH t
      SET t.bookmarks = t.bookmarks - 1
      RETURN t.bookmarks
      `,
      { userId, tweetId },
    )
    await tx.commit()
  } catch (error) {
    await tx.rollback()
    throw error
  } finally {
    await session.close()
  }
}
