import { NeedAuth } from '@app/server/common/decorators/auth.decorator'
import { CurrentUser } from '@app/server/common/decorators/user.decorator'
import { UserDocument } from '@lib/db/models/user.model'
import { Body, Controller, Post } from '@nestjs/common'
import { USayDto } from './u-say.dto'
import { USayService } from './u-say.service'

@Controller('u_say')
export class USayController {
  constructor(private readonly sayService: USayService) {}

  @Post('/')
  @NeedAuth(true)
  async newSay(@Body() body: USayDto, @CurrentUser() user: UserDocument) {
    const res = await this.sayService.newSay(user._id, body)
    return res
  }
}
