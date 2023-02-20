import { buildServer } from "./server"

const isTestEnv = process.env.NODE_ENV === 'test'

const run = async () => {
  const server = await buildServer({ enableLogging: true })
  try {
    await server.listen({ port: 3000 })
  } catch (err) {
    server.log.error(err)
    if (!isTestEnv) {
      process.exit(1)
    }
  }
}

if (!isTestEnv) {
  void run()
}

export { run }