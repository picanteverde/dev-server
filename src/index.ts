import Fastify from 'fastify'
import simple from './files/simple.js'
import spawn from './cmds/spawn.js'
import docker from './docker/index.js'
import projects from './projects/index.js'

const fastify = Fastify({
  logger: true
})

// Register CORS plugin
await fastify.register(import('@fastify/cors'), {
  origin: true, // Allow any origin
  credentials: true
})

// Declare a route
fastify.get('/', async function handler (request, reply) {
  return { hello: 'world' }
})

fastify.register(simple, { prefix: '/fs' })
fastify.register(spawn, { prefix: '/cmds' })
fastify.register(docker, { prefix: '/docker' })
fastify.register(projects, { prefix: '/projects' })
// Run the server!
fastify.listen({ port: 3000, host: '0.0.0.0' })
  .then(() => {
    fastify.log.info('Server is running on port 3000')
  })
  .catch((err) => {
    fastify.log.error(err)
    process.exit(1)
  })
