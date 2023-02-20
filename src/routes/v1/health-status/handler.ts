import { RouteHandler } from "fastify";
import { Reply } from "./schema";

const healthStatusHandler: RouteHandler<{ Reply: Reply }> = async function (req, reply) {
    reply.send({
        data: { status: 'ok' }
    })
}

export { healthStatusHandler }