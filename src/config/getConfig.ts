import * as dotenv from 'dotenv'
import { getEnv } from "./getEnv"

dotenv.config()

function getConfig() {
    return {
        isTestEnv: getEnv('NODE_ENV', 'development') === 'test',
        host: getEnv('HOST', 'localhost'),
        port: +getEnv('PORT', '3000')
    }
}

export { getConfig }