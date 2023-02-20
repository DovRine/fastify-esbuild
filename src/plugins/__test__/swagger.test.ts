import { describe, it, expect } from 'vitest'
import { buildServer } from '../../server'

describe('swagger plugin', () => {
    it('is installed', async () => {
        // setup
        const server = await buildServer({ enableLogging: false })

        // execute
        const response = await server.inject({
            method: 'GET',
            url: '/documentation'
        })

        // assert
        expect(response.statusCode).toBe(302)
    })
})