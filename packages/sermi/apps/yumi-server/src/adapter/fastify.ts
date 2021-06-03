import { FastifyAdapter } from '@nestjs/platform-fastify'
import { fastifyHelmet } from 'fastify-helmet'
export const app = new FastifyAdapter({
  logger: false,
  trustProxy: true,
})

app.register(fastifyHelmet, { contentSecurityPolicy: false })

export { app as fastifyAdpter }
