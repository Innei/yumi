import { Global, Module } from '@nestjs/common'
import { EmailService } from './helper.service.email'

@Module({
  providers: [EmailService],
})
@Global()
export class HelperModule {}
