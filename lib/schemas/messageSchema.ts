import {z} from 'zod'

export const messageSchema = z.object({
  content: z.string()
  .min(10, "content must be at least 6 character")
  .max(300, "content must be no longer than 300 character")
})