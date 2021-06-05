import { __DEV__ } from '@app/server/utils'
import {
  Injectable,
  CacheInterceptor,
  ExecutionContext,
  CACHE_KEY_METADATA,
  CallHandler,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { IncomingMessage } from 'http'
import { Observable } from 'rxjs'
import { HTTP_CACHE_KEY_PREFIX } from '../constants'

@Injectable()
// @ts-ignore
export class HttpCacheInterceptor extends CacheInterceptor {
  private readonly reflector: Reflector
  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    // 如果想彻底禁用缓存服务，则直接返回 -> return call$;
    const call$ = next.handle()

    if (__DEV__) {
      return call$
    } else {
      return super.intercept(context, next)
    }
  }
  trackBy(context: ExecutionContext): string | undefined {
    const http = context.switchToHttp()
    const meta = this.reflector.get(CACHE_KEY_METADATA, context.getHandler())

    const req = http.getRequest() as IncomingMessage
    const path = req.url

    return HTTP_CACHE_KEY_PREFIX + (meta ? `name:${meta}` : path)
  }
}
