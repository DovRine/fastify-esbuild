import { describe, it, expect, vi } from 'vitest'
import { build, Plugin } from 'esbuild'
import { esbuildPluginFastifySwaggerUi } from '../esbuildPluginFastifySwaggerUi'
import { doBuild } from '../doBuild'
import esbuildPluginPino from 'esbuild-plugin-pino'

vi.mock('esbuild', () => {
    return {
        default: vi.fn(),
        build: vi.fn()
    }
})

vi.mock('tiny-glob', () => {
    return {
        default: vi.fn().mockResolvedValue(['a.ts', 'b.ts'])
    }
})

vi.mock('esbuild-plugin-pino', () => {
    return {
        default: vi.fn()
    }
})

vi.mock('../esbuildPluginFastifySwaggerUi', () => {
    return {
        default: vi.fn(),
        esbuildPluginFastifySwaggerUi: vi.fn()
    }
})

vi.mock('esbuild-plugin-pino', () => {
    return {
        default: vi.fn().mockReturnValue({
            marker: 'test'
        } as unknown as Plugin)
    }
})

describe('doBuild', () => {
    it('calls esbuild.build with correct params', async () => {
        // setup
        const swaggerPlugin = esbuildPluginFastifySwaggerUi()
        const pinoPlugin = esbuildPluginPino({ transports: [''] })

        // execute
        await doBuild()

        // assert
        expect(build).toHaveBeenCalledTimes(1)
        expect(build).toHaveBeenCalledWith(expect.objectContaining({
            entryPoints: ['a.ts', 'b.ts'],
            logLevel: 'info',
            outdir: 'dist',
            bundle: true,
            minify: true,
            platform: 'node',
            format: 'cjs',
            sourcemap: false,
            plugins: [
                {
                    ...pinoPlugin,
                    setup: expect.any(Function),
                },
                swaggerPlugin
            ]
        }))
    })
})