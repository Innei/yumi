import {
  GuestPass,
  NeedAuth,
} from '@app/server/common/decorators/auth.decorator'
import { CurrentUser } from '@app/server/common/decorators/user.decorator'
import { snowflake } from '@app/server/utils'
import { UserDocument, UserModel } from '@lib/db/models/user.model'
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { pick } from 'lodash'
import { ByQueryDto, IdDto, PartialUserDto, ResetPasswordDto } from './user.dto'
import { UsersService } from './users.service'

// TODO Role Serialize
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

  @Patch('self')
  @NeedAuth(true)
  @HttpCode(204)
  async patchSelf(
    @CurrentUser() user: UserDocument,
    @Body() body: PartialUserDto,
  ) {
    const data = pick(body, UserModel.normalizeField)

    await this.userService.patchUser(user.id, data)
    return
  }

  @Post('forgot')
  @NeedAuth(true)
  @HttpCode(204)
  async resetPassword(
    @CurrentUser() user: UserDocument,
    @Body() body: ResetPasswordDto,
  ) {
    return await this.userService.resetPassword(
      user.id,
      body.new_password,
      body.old_password,
    )
  }

  @Post('change-email')
  @NeedAuth(true)
  async changeEmail() {
    // TODO
    return 'OK'
  }
}
