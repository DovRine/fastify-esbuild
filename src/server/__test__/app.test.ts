import vitest, { describe, it, expect, vi, beforeAll, afterEach } from 'vitest'
import { FastifyInstance } from 'fastify'
import { buildServer } from '../../server/buildServer'
import { getConfig } from '../../config/getConfig'
import { run } from '../app'

vi.mock('../../config/getConfig')
vi.mock('../../server/buildServer')
vi.mock('../runServerCallback')

describe('app', () => {
    const mockGetConfig = getConfig as vitest.MockedFunction<typeof getConfig>
    const mockBuildServer = buildServer as vitest.MockedFunction<typeof buildServer>
    const isTestEnv = true
    beforeAll(() => {
        mockBuildServer.mockResolvedValue({
            log: {
                error: vi.fn()
            },
            listen: vi.fn(),
        } as unknown as FastifyInstance)
    })
    afterEach(() => {
        vi.resetAllMocks()
    })
    it('builds the server and starts it', async () => {
        // setup
        const host = '1.2.3.4'
        const port = 9999
        mockGetConfig.mockReturnValue({ host, port, isTestEnv })
        const server = await buildServer({ enableLogging: false })

        // execute
        await run()

        // assert
        expect(server.listen).toHaveBeenCalledTimes(1)
        expect(server.listen).toHaveBeenCalledWith({ host, port }, expect.any(Function))
    })
})