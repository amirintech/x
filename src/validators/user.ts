import { z } from 'zod'

export const upsertUserSchema = z.object({
  username: z
    .string({ required_error: 'Username is required' })
    .min(2, { message: 'Username must be at least 2 characters' }),
})
