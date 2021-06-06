import { NeedAuth } from '@app/server/common/decorators/auth.decorator'
import { Body, Controller, Post } from '@nestjs/common'
import { USayDto } from './u-say.dto'
import { USayService } from './u-say.service'

@Controller('u_say')
export class USayController {
  constructor(private readonly sayService: USayService) {}

  @Post('/')
  @NeedAuth(true)
  async newSay(@Body() body: USayDto) {
    return body
  }
}
