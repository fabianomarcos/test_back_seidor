import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  PORT: z.string().optional(),
  DATABASE_URL: z.url(),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error('Invalid environment variables', _env.error.format())
  throw new Error('Invalid environment variables')
}

export const environments = _env.data
