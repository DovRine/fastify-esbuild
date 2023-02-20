import { describe, it, expect, vi, afterEach } from 'vitest'

describe('esbuild::index', () => {
    afterEach(() => {
        vi.resetAllMocks()
    })

    it('it calls doBuild on import', async () => {
        // setup
        const doBuild = vi.fn()
        vi.doMock('../doBuild', () => {
            return {
                default: {},
                doBuild
            }
        })

        // execute
        await import('../index')

        // assert
        expect(doBuild).toHaveBeenCalledTimes(1)
    })
})