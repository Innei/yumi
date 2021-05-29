import { Module } from '@nestjs/common'
import { DbModule } from '@yumi/db'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
  imports: [DbModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
