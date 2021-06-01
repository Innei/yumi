/*
 * @Author: Innei
 * @Date: 2020-05-08 20:01:58
 * @LastEditTime: 2020-09-06 11:20:09
 * @LastEditors: Innei
 * @FilePath: /mx-server/src/core/filters/any-exception.filter.ts
 * @Coding with Love
 */

import { getIp, __DEV__ } from '@app/server/utils'
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common'
import { FastifyReply, FastifyRequest } from 'fastify'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger('捕获异常')
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<FastifyReply>()
    const request = ctx.getRequest<FastifyRequest>()

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : (exception as any)?.status ||
          (exception as any)?.statusCode ||
          HttpStatus.INTERNAL_SERVER_ERROR

    const message =
      (exception as any)?.response?.message ||
      (exception as any)?.message ||
      '未知错误'
    if (__DEV__) {
      console.error(exception)
    } else {
      const ip = getIp(request)
      this.logger.warn(
        `IP: ${ip} 错误信息: [${status}] ${message} Path: ${decodeURI(
          request.raw.url,
        )}`,
      )
    }

    response.status(status).send({
      ok: 0,
      message,
    })
  }
}
