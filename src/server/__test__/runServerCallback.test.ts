import { FastifyInstance } from "fastify";
import { expect, describe, it, vi, beforeAll, afterEach } from 'vitest'
import { runServerCallback } from "../runServerCallback";

describe('runServeCallback', () => {
    let server: FastifyInstance
    beforeAll(() => {
        server = {
            log: {
                info: vi.fn(),
                error: vi.fn()
            }
        } as unknown as FastifyInstance
    })
    afterEach(() => {
        vi.resetAllMocks()
    })
    it('logs a message on success', () => {
        // setup
        const address = '1.2.3.4:5678'
        const error = undefined

        // execute
        runServerCallback.call(server, error, address)

        // assert
        expect(server.log.error).toHaveBeenCalledTimes(0)
        expect(server.log.info).toHaveBeenCalledTimes(1)
        expect(server.log.info).toHaveBeenCalledWith(expect.stringContaining(address))
    })
    it('logs an error on error', () => {
        // setup
        const address = '1.2.3.4:5678'
        const errorMessage = 'test error'
        const error = new Error(errorMessage)

        // execute
        runServerCallback.call(server, error, address)

        // assert
        expect(server.log.info).toHaveBeenCalledTimes(0)
        expect(server.log.error).toHaveBeenCalledTimes(1)
        expect(server.log.error).toHaveBeenCalledWith(error)
    })
})