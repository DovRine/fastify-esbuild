import path from 'node:path'
import { cp } from 'node:fs/promises'
import type { Plugin } from 'esbuild'

/** esbuild plugin to copy static folder to dist */
function esbuildPluginFastifySwaggerUi(): Plugin {
    return {
        name: '@fastify/swagger-ui',
        setup(build) {
            const { outdir } = build.initialOptions
            const fastifySwaggerUi = path.dirname(
                require.resolve('@fastify/swagger-ui')
            )
            const source = path.join(fastifySwaggerUi, 'static')
            const dest = path.join(outdir, 'static')

            build.onEnd(async () => cp(source, dest, { recursive: true }))
        }
    }
}

export { esbuildPluginFastifySwaggerUi }