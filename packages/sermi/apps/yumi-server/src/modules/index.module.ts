import { Module } from '@nestjs/common'
import { DbModule } from '@lib/db'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [DbModule, UsersModule, AuthModule],
  providers: [],
  controllers: [],
  exports: [UsersModule, AuthModule],
})
export class RoutesModule {}
