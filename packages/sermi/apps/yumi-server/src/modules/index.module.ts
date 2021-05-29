import { Module } from '@nestjs/common'
import { DbModule } from '@yumi/db/dist'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [DbModule, UsersModule, AuthModule],
  providers: [],
  controllers: [],
  exports: [DbModule, UsersModule, AuthModule],
})
export class RoutesModule {}
