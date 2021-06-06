import { Module } from '@nestjs/common'
import { USayController } from './u-say.controller'
import { USayService } from './u-say.service'

@Module({
  controllers: [USayController],
  providers: [USayService],
})
export class USayModule {}
