/**
 * HttpUnauthorized error.
 * @file 401 错误生成器
 * @module error/unauthorized
 * @author Surmon <https://github.com/surmon-china>
 */

import * as TEXT from '../constants'
import { UnauthorizedException } from '@nestjs/common'

/**
 * @class HttpUnauthorizedError
 * @classdesc 401 -> 未授权/权限验证失败
 * @example new HttpUnauthorizedError('全新验证失败')
 * @example new HttpUnauthorizedError('错误信息', new Error())
 */
export class HttpUnauthorizedError extends UnauthorizedException {
  constructor(message?: string, error?: any) {
    super(message || TEXT.HTTP_UNAUTHORIZED_TEXT_DEFAULT, error)
  }
}
