import { getConfig } from "../config"
import { buildServer } from "../server"
import { runServerCallback } from "./runServerCallback"

const run = async () => {
  const { host, port } = getConfig()
  const server = await buildServer({ enableLogging: true })
  server.listen({ host, port }, runServerCallback.bind(server))
}

if (process.env.NODE_ENV !== 'test') {
  void run()
}

export { run }