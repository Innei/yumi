/**
 * Logging interceptor.
 * @file 日志拦截器
 * @module interceptor/logging
 * @author Surmon <https://github.com/surmon-china>
 */

import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
  Logger,
} from '@nestjs/common'
import { __DEV__ } from '@app/server/utils'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private logger: Logger

  constructor() {
    this.logger = new Logger(LoggingInterceptor.name, true)
  }
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const call$ = next.handle()
    if (!__DEV__) {
      return call$
    }
    const request = context.switchToHttp().getRequest()
    const content = request.method + ' -> ' + request.url
    this.logger.debug('+++ 收到请求：' + content)

    return call$.pipe(tap(() => this.logger.debug('--- 响应请求：' + content)))
  }
}
