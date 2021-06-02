import { Module } from '@nestjs/common'
import { HelperModule } from './helper/helper.module'

@Module({
  imports: [HelperModule],
  exports: [HelperModule],
})
export class UtilsModule {}
