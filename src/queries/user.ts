import driver from '@/lib/db'

export type CreateUserInput = {
  id: string
  username: string
}

export async function createUser({ id, username }: CreateUserInput) {
  const session = driver.session()
  try {
    const result = await session.run(
      `
      CREATE (u:User {
        id: $id,
        username: $username,
        followersCount: 0,
        followingCount: 0,
        postsCount: 0
      })
      RETURN u
      `,
      { id, username },
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
