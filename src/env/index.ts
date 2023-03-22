import 'dotenv/config'
import { z } from 'zod'

// process.env: { KEY:value, ......... } no value? value = default '...'
const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  PORT: z.coerce.number().default(3333), // w/e type , convert to number
})

// validate .env variables === schema
const _env = envSchema.safeParse(process.env)
if (_env.success === false) {
  console.error('  ❌ Invalid .env variables.  ', _env.error.format()) // friendly format all errors in schema
  throw new Error('Invalid .env variables.')
}

// env.VARIABLE
export const env = _env.data
