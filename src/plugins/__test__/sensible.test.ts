import { RouteHandler } from 'fastify'
import { describe, it, expect } from 'vitest'
import { buildServer } from '../../server'

describe('sensible plugin', () => {
    it('is installed', async () => {
        // setup
        let didCall = false
        const handler: RouteHandler = (req, reply) => {
            expect(reply.notFound).toBeDefined()
            didCall = true
            reply.send('ok')
        }
        const server = await buildServer({ enableLogging: false })
        await server.register(
            async (server) => server.get('/test', {}, handler)
        )

        // execute
        await server.inject({
            method: 'GET',
            url: '/test'
        })

        // assert
        expect(didCall).toBe(true)
    })
})