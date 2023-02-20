import { describe, it, vi, expect, afterEach, afterAll } from 'vitest'
import Fastify, { FastifyInstance } from 'fastify'
import { join } from 'path'
import autoload from '@fastify/autoload'
import { buildServer } from '../index'

const srcPath = __dirname.split('/').slice(0, -1).join('/')

vi.mock('path', () => ({
    join: vi.fn().mockImplementation(() => srcPath)
}))

vi.mock('fastify', () => {
    return {
        default: vi.fn().mockImplementation(() => ({
            log: {
                info: vi.fn()
            },
            printRoutes: vi.fn(),
            ready: vi.fn(),
            register: vi.fn(),
        }))
    } as unknown as FastifyInstance
})

vi.mock('@fastify/autoload', () => {
    return {
        default: vi.fn()
    }
})

describe('buildServer', () => {
    afterEach(() => {
        vi.restoreAllMocks()
    })
    afterAll(() => {
        vi.resetAllMocks()
    })

    it('builds and configures a fastify server', async () => {
        // execute
        const server = await buildServer({ enableLogging: false })

        // assert
        expect(Fastify).toHaveBeenCalledTimes(1)
        expect(Fastify).toHaveBeenCalledWith(expect.objectContaining({
            logger: false
        }))

        expect(join).toHaveBeenCalledTimes(3)
        expect(join).toHaveBeenNthCalledWith(1, srcPath, '..')
        expect(join).toHaveBeenNthCalledWith(2, srcPath, 'plugins')
        expect(join).toHaveBeenNthCalledWith(3, srcPath, 'routes')

        expect(server.register).toHaveBeenCalledTimes(2)
        expect(server.register).toHaveBeenNthCalledWith(1, autoload, { dir: srcPath, ignorePattern: expect.any(RegExp) })
        expect(server.register).toHaveBeenNthCalledWith(2, autoload, { dir: srcPath, ignorePattern: expect.any(RegExp) })

        expect(server.ready).toHaveBeenCalledTimes(1)
        expect(server.ready).toHaveBeenCalledWith(expect.any(Function))
    })

    it('uses the singleton pattern', async () => {
        // execute
        const server = await buildServer({ enableLogging: false })
        const server2 = await buildServer({ enableLogging: false })

        // assert
        expect(server).toBe(server2)
    })
})