import { FastifyInstance } from 'fastify'
import { getConfig } from '../config'

function runServerCallback(
    this: FastifyInstance,
    err: Error,
    address: string
) {
    if (err) {
        const { isTestEnv } = getConfig()
        this.log.error(err)
        !isTestEnv && process.exit(1)
        return
    }
    this.log.info(`server listening on ${address}`)
}

export { runServerCallback }