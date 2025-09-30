import type { FastifyInstance } from 'fastify'
import Docker from 'dockerode'
import pathFs from 'path'

const root = process.env.PROJECTS || '/apps'

export default async (fastify: FastifyInstance) => {
  const docker = new Docker({
    host: process.env.DOCKERODE_HOST,
    port: process.env.DOCKERODE_PORT,
  })

  fastify.get('/containers', async (request, reply) => {
    const containers = await docker.listContainers()
    return containers
  })

  fastify.post('/runShell', async (request, reply) => {
    const { image, name, project } = request.body as {
      image: string
      name: string
      project: string
    }
    const container = await docker.run(image, ['/bin/sh'], reply.raw, {
      name: name,
      Volumes: {
        [pathFs.join(root, project)]: '/usr/app',
      },
      WorkingDir: '/usr/app',
      AttachStdin: true,
    })
    return container
  })
}