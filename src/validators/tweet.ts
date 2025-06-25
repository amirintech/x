import { z } from 'zod'

export const upsertTweetSchema = z.object({
  id: z.string({ required_error: 'Tweet id is required' }),
  userId: z.string({ required_error: 'User id is required' }),
  content: z
    .string({ required_error: 'Tweet content is required' })
    .max(280, { message: 'Tweet content must be at most 280 characters' })
    .optional(),
  tags: z.array(z.string()).optional(),
  mediaSrcs: z.array(z.string()).optional(),
})

export const deleteTweetSchema = z.object({
  id: z.string({ required_error: 'Tweet id is required' }),
  userId: z.string({ required_error: 'User id is required' }),
})
