import { FastifySchema } from "fastify"
import { FromSchema } from "json-schema-to-ts"

const replySchema = {
    $id: 'health-status',
    type: 'object',
    properties: {
        data: {
            type: 'object',
            properties: {
                status: {
                    type: 'string',
                }
            },
            required: ['status']
        }
    },
    required: ['data']
} as const

type Reply = FromSchema<typeof replySchema>

const healthStatusSchema: FastifySchema = {
    tags: ['Health Status'],
    description: 'Determine if service is running',
    response: {
        200: {
            ...replySchema
        }
    }
}

export { healthStatusSchema, replySchema }
export type { Reply }