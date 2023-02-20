import { describe, it, expect } from 'vitest'
import { buildServer } from '../../../../server'

describe('GET /health-status', () => {
    it('returns 200 and status ok', async () => {
        // setup
        const server = await buildServer({ enableLogging: false })

        // execute
        const response = await server.inject({
            method: 'GET',
            url: '/v1/health-status'
        })
        // assert
        expect(response.statusCode).toBe(200)
    })
})