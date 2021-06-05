import { CacheModule, Global, Module } from '@nestjs/common'
import { EmailService } from './helper.service.email'
import * as redisStore from 'cache-manager-redis-store'
import { RedisService } from './helper.service.redis'

const CacheModuleDynamic = CacheModule.registerAsync({
  useFactory: () => ({
    // @ts-ignore
    store: redisStore,
    host: 'localhost',
    port: 6379,
    ttl: 5,
    max: 300,
  }),
})

@Module({
  imports: [CacheModuleDynamic],
  providers: [EmailService, RedisService],
  exports: [CacheModuleDynamic],
})
@Global()
export class HelperModule {}
