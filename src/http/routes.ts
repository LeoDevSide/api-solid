import { prisma } from '@/lib/prisma'
import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify'
import { register } from './controllers/register'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)

  app.get('/users', async (req: FastifyRequest, res: FastifyReply) => {
    return await prisma.user.findMany()
  })
}
