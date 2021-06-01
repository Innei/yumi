import { applyDecorators, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger'
import { __DEV__ } from '../../utils'

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
