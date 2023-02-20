import type { FastifyInstance } from "fastify";
import { healthStatusSchema, replySchema } from './schema'
import { healthStatusHandler } from "./handler";

export default async (server: FastifyInstance) => {
    server.addSchema(replySchema)
    server.get('/', { schema: healthStatusSchema }, healthStatusHandler)
}