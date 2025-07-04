import driver from '@/lib/db'

export type CreateUserInput = {
  id: string
  username: string
  name: string
  joinedDate: string
}

export async function createUser({ id, username, name, joinedDate }: CreateUserInput) {
  const session = driver.session()
  try {
    const result = await session.run(
      `
      CREATE (u:User {
        id: $id,
        username: $username,
        followersCount: 0,
        followingCount: 0,
        postsCount: 0,
        isVerified: false,
        name: $name,
        joinedDate: $joinedDate
      })
      RETURN u
      `,
      { id, username, name, joinedDate },
    )
    const record = result.records[0]
    return record ? record.get('u').properties : null
  } finally {
    await session.close()
  }
}

export type UpdateUserInput = {
  username: string
  bio?: string
  location?: string
  website?: string
  followersCount?: number
  followingCount?: number
  postsCount?: number
}

export async function updateUser(user: UpdateUserInput) {
  if (!user.bio && !user.location && !user.website && !user.followersCount && !user.followingCount && !user.postsCount)
    return

  const session = driver.session()
  try {
    const result = await session.run(
      `
      MATCH (u:User { username: $username })
      SET u.bio = $bio,
          u.location = $location,
          u.website = $website,
          u.followersCount = $followersCount,
          u.followingCount = $followingCount,
          u.postsCount = $postsCount
      RETURN u
      `,
      user,
    )
    const record = result.records[0]
    return record ? record.get('u').properties : null
  } finally {
    await session.close()
  }
}

export async function deleteUser(id: string) {
  const session = driver.session()
  try {
    await session.run(
      `
      MATCH (u:User { id: $id })
      DETACH DELETE u
      `,
      { id },
    )
  } finally {
    await session.close()
  }
}

export type GetUserInput = {
  id?: string
  username?: string
  requesterId?: string
}

export type GetUserOutput = {
  id: string
  name: string
  username: string
  followersCount: number
  followingCount: number
  postsCount: number
  bio?: string
  location?: string
  website?: string
  imageUrl?: string
  bannerUrl?: string
  isVerified: boolean
  joinedDate: string
  isFollowing?: boolean
  isFollowingBack?: boolean
}

export async function getUser({ id, username, requesterId }: GetUserInput): Promise<GetUserOutput | null> {
  if (!id && !username) return null
  const session = driver.session()
  try {
    const result = await session.run(
      `
      MATCH (u:User ${id ? '{ id: $id }' : '{ username: $username }'})
      OPTIONAL MATCH (requester:User { id: $requesterId })
      OPTIONAL MATCH (requester)-[f:FOLLOWS]->(u)
      OPTIONAL MATCH (u)-[fb:FOLLOWS]->(requester)
      RETURN u, 
        CASE WHEN f IS NULL THEN false ELSE true END AS isFollowing,
        CASE WHEN fb IS NULL THEN false ELSE true END AS isFollowingBack
      `,
      id ? { id, requesterId } : { username, requesterId },
    )
    const record = result.records[0]
    if (!record) return null
    const user = record.get('u').properties
    return {
      ...user,
      isFollowing: record.get('isFollowing'),
      isFollowingBack: record.get('isFollowingBack'),
    }
  } finally {
    await session.close()
  }
}

export type UnfollowUserInput = {
  followerId: string
  followingId: string
}

export async function unfollowUser({ followerId, followingId }: UnfollowUserInput): Promise<void> {
  const session = driver.session()
  const tx = session.beginTransaction()
  try {
    // Delete the FOLLOWS relationship and update counts atomically
    await tx.run(
      `
      MATCH (follower:User { id: $followerId })-[r:FOLLOWS]->(following:User { id: $followingId })
      DELETE r
      WITH follower, following
      SET follower.followingCount = follower.followingCount - 1,
          following.followersCount = following.followersCount - 1
      RETURN follower.followingCount, following.followersCount
      `,
      { followerId, followingId },
    )
    await tx.commit()
  } catch (error) {
    await tx.rollback()
    throw error
  } finally {
    await session.close()
  }
}

export type FollowUserInput = {
  followerId: string
  followingId: string
}

export async function followUser({ followerId, followingId }: FollowUserInput): Promise<void> {
  const session = driver.session()
  const tx = session.beginTransaction()
  try {
    const now = new Date().toISOString()
    // Create the FOLLOWS relationship and update counts atomically
    await tx.run(
      `
      MATCH (follower:User { id: $followerId }), (following:User { id: $followingId })
      WITH follower, following
      OPTIONAL MATCH (follower)-[existing:FOLLOWS]->(following)
      WITH follower, following, existing
      WHERE existing IS NULL
      CREATE (follower)-[r:FOLLOWS]->(following)
      SET r.createdAt = $now
      WITH follower, following
      SET follower.followingCount = follower.followingCount + 1,
          following.followersCount = following.followersCount + 1
      RETURN follower.followingCount, following.followersCount
      `,
      { followerId, followingId, now },
    )
    await tx.commit()
  } catch (error) {
    await tx.rollback()
    throw error
  } finally {
    await session.close()
  }
}
