import { PluginBuild } from 'esbuild'
import { describe, it, expect, vi } from 'vitest'
import { esbuildPluginFastifySwaggerUi } from '../esbuildPluginFastifySwaggerUi'
import path from 'node:path'

vi.mock('node:path', () => {
    return {
        default: {
            dirname: vi.fn().mockImplementation(() => require
                .resolve('@fastify/swagger-ui')
                .split('/')
                .slice(0, -1)
                .join('/')),
            join: vi.fn()
        }
    }
})

vi.mock('node:fs/promises')

describe('esbuildPluginFastifySwaggerUi', () => {
    it('provides a fastify plugin setup function for swagger-ui that esbuild can compile', () => {
        // setup
        const build = {
            initialOptions: {
                outdir: '/path/to/outdir'
            },
            onEnd: vi.fn()
        } as unknown as PluginBuild


        // execute
        const plugin = esbuildPluginFastifySwaggerUi()
        plugin.setup(build)

        const realSwaggerUiPath = require.resolve('@fastify/swagger-ui').split('/')
            .slice(0, -1)
            .join('/')
        // assert
        expect(plugin.name).toBe('@fastify/swagger-ui')
        expect(path.dirname).toHaveBeenCalledTimes(1)
        expect(path.dirname).toHaveBeenCalledWith(`${realSwaggerUiPath}/index.js`)
        expect(path.join).toHaveBeenCalledTimes(2)
        expect(path.join).toHaveBeenNthCalledWith(1, realSwaggerUiPath, 'static')
        expect(path.join).toHaveBeenNthCalledWith(2, '/path/to/outdir', 'static')
        expect(build.onEnd).toHaveBeenCalledTimes(1)
        expect(build.onEnd).toHaveBeenCalledWith(expect.any(Function))
    })
})