import { FastifyRequest } from 'fastify'
import { IncomingMessage } from 'http'
import { randomBytes } from 'crypto'
import { promisify } from 'util'

export * from './snowflake'
export const __DEV__ = process.env.NODE_ENV === 'development'
export const __TEST__ = ['true', 'TRUE', '1'].includes(process.env.TEST)
export const getIp = (request: FastifyRequest | IncomingMessage) => {
  const _ = request as any
  // @ts-ignore
  let ip: string =
    _.headers['x-forwarded-for'] ||
    _.ip ||
    _.raw.connection.remoteAddress ||
    _.raw.socket.remoteAddress ||
    undefined
  if (ip && ip.split(',').length > 0) {
    ip = ip.split(',')[0]
  }
  return ip
}

export const randomString = async (len = 6) => {
  const random = promisify(randomBytes)
  const buffer = await random(48)
  return buffer.toString('hex').slice(0, len)
}
