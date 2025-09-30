import type { FastifyInstance } from 'fastify'
import fs from 'fs/promises'
import { spawn } from 'child_process'
import pathFs from 'path'

const root = process.env.PROJECTS || '/apps'

export default async (fastify: FastifyInstance) => {
  fastify.get('/all', async (request, reply) => {
    const files = await fs.readdir(root, { withFileTypes: true });
    return {
      directories: files.filter(file => file.isDirectory()).map(file => file.name),
    };
  })
  fastify.post('/clone', async (request, reply) => {
    const { url } = request.body as { url: string }
    const result = await spawn('git', ['clone', url, pathFs.join(root, url.split('/').pop() || 'test')], {
      stdio: 'inherit'
    })
    return result.stdout
  })
  fastify.post('/create', async (request, reply) => {
    const { name } = request.body as { name: string }
    await spawn('mkdir', [pathFs.join(root, name)])
    const result = await spawn('git', ['init'], {
      stdio: 'inherit'
    })
    return result.stdout
  })
  fastify.post('/delete', async (request, reply) => {
    const { name } = request.body as { name: string }
    const result = await spawn('rm', ['-rf', pathFs.join(root, name)])
    return result.stdout
  })
}