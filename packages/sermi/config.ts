import { argv } from 'yargs'

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
}
