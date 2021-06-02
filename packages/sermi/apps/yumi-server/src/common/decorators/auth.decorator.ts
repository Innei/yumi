import { applyDecorators, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger'
import { __DEV__ } from '../../utils'
import { GuestPassGuard } from '../guards/guest.guard'

export function NeedAuth(devValid = false) {
  const decorators = []
  if (!__DEV__ || devValid) {
    decorators.push(UseGuards(AuthGuard('jwt')))
  }
  decorators.push(
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  )
  return applyDecorators(...decorators)
}

/**
 * 游客可查看, 登录用户挂载 user
 */
export function GuestPass() {
  return applyDecorators(UseGuards(GuestPassGuard), ApiBearerAuth())
}
