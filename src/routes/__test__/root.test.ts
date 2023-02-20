import { describe, it, expect } from 'vitest'
import { buildServer } from '../../server'

describe('GET /', () => {
    it('returns 404 not found', async () => {
        // setup
        const server = await buildServer({ enableLogging: false })

        // execute
        const response = await server.inject({
            method: 'GET',
            url: '/'
        })

        // assert
        expect(response.statusCode).toBe(404)
    })
})