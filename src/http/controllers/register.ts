import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { registerUseCase } from '@/use-cases/register'

export async function register(req: FastifyRequest, res: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(req.body)

  try {
    await registerUseCase({
      name,
      email,
      password,
    })
  } catch (err) {
    res.status(201).send()
  }

  return res.status(201).send()
}
