import { argv } from 'yargs'
import { config } from 'dotenv'
const parsed = config().parsed || {}

export const appConfig = {
  jwtSecret: 'asdadsfcvxgq2adasdxzcz',
  mongo: {
    uri: `mongodb://127.0.0.1:${argv.dbport || '27017'}/yumi`,
    username: argv.db_username || 'root',
    password: argv.db_password || '',
  },
  redis: {
    host: argv.redis_host || 'localhost',
    port: argv.redis_port || 6379,
    ttl: null,
    defaultCacheTTL: 60 * 60 * 24,
  },
  email: {
    account: argv.email_account || 'no-reply@innei.ren',
    password:
      argv.email_password || parsed.EMAIL_PASSWORD || 'your email password',
    from: '"yumi" <no-reply@innei.ren>',
    admin: 'i@innei.ren',
  },
}
