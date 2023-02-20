import fp from 'fastify-plugin'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'

export default fp(async (fastify) => {
  fastify.register(swagger, {
    openapi: {
      info: {
        title: 'Fastify REST API',
        description: 'REST API Documentation',
        version: '1.0.0'
      },
      servers: [
        {
          url: 'http://localhost'
        }
      ]
    },
    hideUntagged: true
  })
  fastify.register(swaggerUi)
})
