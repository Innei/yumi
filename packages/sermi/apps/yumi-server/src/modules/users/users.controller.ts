import {
  GuestPass,
  NeedAuth,
} from '@app/server/common/decorators/auth.decorator'
import { CurrentUser } from '@app/server/common/decorators/user.decorator'
import { snowflake } from '@app/server/utils'
import { UserDocument } from '@lib/db/models/user.model'
import { Controller, Get, Param, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ByQueryDto, IdDto } from './user.dto'
import { UsersService } from './users.service'

@Controller('users')
@ApiTags('User')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('self')
  @NeedAuth(true)
  async getMe(@CurrentUser() user: UserDocument) {
    return user.serialize()
  }

  @Get(':id')
  @GuestPass()
  async getUserById(
    @Param() { id }: IdDto,
    @CurrentUser() user?: UserDocument,
  ) {
    if (user && snowflake.compare(id, user.id)) {
      return user.serialize()
    }
    return (await this.userService.getUserById(id)).serializeForUser()
  }

  @Get('by')
  @GuestPass()
  async by(@Query() query: ByQueryDto) {
    // TODO
    return query
  }
}
