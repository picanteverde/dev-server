import type { FastifyInstance, FastifyPluginOptions } from 'fastify'
import staticPlugin from'@fastify/static'
import fs from 'fs/promises'
import pathFs from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = pathFs.dirname(__filename)
const root = pathFs.join(__dirname, '../../')

export default async (fastify: FastifyInstance, options: FastifyPluginOptions) => {
  fastify.register(staticPlugin, {
    root,
    prefix: '/public', // optional: default '/'
  })
  fastify.get('/ls', async (request) => {
    const path = (request.query as {path: string }).path;
    const files = await fs.readdir(path, { withFileTypes: true });

    return {
      files: files.filter(file => file.isFile()).map(file => file.name),
      directories: files.filter(file => file.isDirectory()).map(file => file.name),
    };
  });
  fastify.get('/read', async (request) => {
    const path = (request.query as {path: string }).path;
    const file = await fs.readFile(path, 'utf8');
    return file;
  });
  fastify.get('/get', async (request, reply) => {
    const fullPath = (request.query as {path: string }).path;
    const filename = pathFs.basename(fullPath);
    const path = pathFs.dirname(fullPath);
    console.log(pathFs.join(root, fullPath))
    reply.sendFile(filename, pathFs.join(root, path))
  });
  fastify.post('/write', async (request, reply) => {
    const { path, content } = request.body as { path: string, content: string };
    await fs.writeFile(path, content);
    return { success: true };
  });
  fastify.post('/delete', async (request, reply) => {
    const { path } = request.body as { path: string };
    await fs.unlink(path);
    return { success: true };
  });
}
