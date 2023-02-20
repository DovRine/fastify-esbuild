import { FastifyPluginAsync } from 'fastify'

const root: FastifyPluginAsync = async (server): Promise<void> => {
  server.get('/', async function (req, reply) {
    reply.notFound()
  })
}

export default root
