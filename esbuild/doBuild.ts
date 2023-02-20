import { build } from 'esbuild'
import esbuildPluginPino from 'esbuild-plugin-pino'
import glob from 'tiny-glob'
import { esbuildPluginFastifySwaggerUi } from './esbuildPluginFastifySwaggerUi';

async function doBuild() {
    const allTypescriptFiles = await glob('src/**/*.ts')

    build({
        entryPoints: allTypescriptFiles,
        logLevel: 'info',
        outdir: 'dist',
        bundle: false,
        minify: true,
        platform: 'node',
        format: 'cjs',
        sourcemap: true,
        plugins: [
            {
                ...esbuildPluginPino({
                    transports: ['pino-pretty']
                })
                , setup: () => {/* NOTE: dummy function for typescript compliance */ }
            },
            esbuildPluginFastifySwaggerUi()
        ]
    })
}
export { doBuild }