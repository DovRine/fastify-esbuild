import { join } from 'path'
import Fastify, { FastifyInstance } from 'fastify'
import autoLoad from '@fastify/autoload'

type BuildOptions = {
    enableLogging: boolean
}

let instance: FastifyInstance

async function buildServer(opts: BuildOptions) {
    if (instance) {
        return instance
    }
    const isTestEnv = process.env.NODE_ENV === 'test'
    const logger = {
        transport: {
            target: 'pino-pretty',
            options: {
                destination: 1,
                colorize: true,
                translateTime: 'HH:MM:ss.l',
                ignore: 'pid,hostname'
            }
        }
    }
    const server = Fastify({ logger: opts.enableLogging ? logger : false })
    const srcPath = join(__dirname, '..')
    const testsRegex = /.*(test|spec)\.(js|ts)/
    await server.register(autoLoad, {
        dir: join(srcPath, 'plugins'),
        ignorePattern: testsRegex
    })

    await server.register(autoLoad, {
        dir: join(srcPath, 'routes'),
        ignorePattern: testsRegex
    })

    server.ready(() => {
        if (!isTestEnv) {
            server.log.info(server.printRoutes())
        }
    })
    instance = server
    return server
}

export { buildServer }