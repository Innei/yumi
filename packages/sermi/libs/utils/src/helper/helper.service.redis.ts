import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common'
import type { create } from 'cache-manager-redis-store'
import { RedisClient } from 'redis'
type Cache = { store: ReturnType<typeof create> }

@Injectable()
export class RedisService {
  private logger: Logger
  constructor(@Inject(CACHE_MANAGER) private cache: Cache) {
    this.logger = new Logger(RedisService.name)
    this.redisClient.on('ready', () => {
      this.logger.log('Redis 已准备好！')
    })
  }

  private get redisClient(): RedisClient {
    return this.cache.store.getClient()
  }

  // 客户端是否可用
  private get checkCacheServiceAvailable(): boolean {
    return this.redisClient.connected
  }
}
