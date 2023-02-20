import { FastifyInstance } from 'fastify'
import { describe, it, expect, vi } from 'vitest'
import { buildServer } from '../server/buildServer'
import { run } from '../app'

vi.mock('../server/buildServer', () => ({
    buildServer: vi.fn().mockResolvedValue({
        log: {
            error: vi.fn()
        },
        listen: vi.fn(),
    } as unknown as FastifyInstance)
}))

describe('app', () => {
    it('builds the server and starts it', async () => {
        // setup
        const server = await buildServer({ enableLogging: false })

        // execute
        await run()

        // assert
        expect(server.listen).toHaveBeenCalledTimes(1)
        expect(server.listen).toHaveBeenCalledWith({ port: 3000 })
    })
    it('logs an error if something goes wrong', async () => {
        // setup
        const error = new Error('test error')
        const server = await buildServer({ enableLogging: false })
        server.listen = vi.fn().mockImplementation(() => { throw error })

        // execute
        await run()

        // assert
        expect(server.listen).toHaveBeenCalledTimes(1)
        expect(server.log.error).toHaveBeenCalledTimes(1)
        expect(server.log.error).toHaveBeenCalledWith(error)
    })
})