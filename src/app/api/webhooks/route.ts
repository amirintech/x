import { createUser, deleteUser, updateUser } from '@/queries/user'
import { upsertUserSchema } from '@/validators/user'
import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req)

    if (evt.type === 'user.created') {
      const { id, username } = evt.data
      const parsedUser = upsertUserSchema.parse({
        username: username!,
      })
      await createUser({
        id,
        username: parsedUser.username,
      })

      redirect('/')
    }

    if (evt.type === 'user.updated') {
      const { username } = evt.data
      const parsedUser = upsertUserSchema.parse({
        username: username!,
      })
      await updateUser({
        username: parsedUser.username,
      })
    }

    if (evt.type === 'user.deleted') {
      const { id } = evt.data
      if (!id) throw new Error('Failed to delete user. User ID is required.')
      await deleteUser(id)
    }

    return new Response('Webhook received', { status: 200 })
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error verifying webhook', { status: 400 })
  }
}
