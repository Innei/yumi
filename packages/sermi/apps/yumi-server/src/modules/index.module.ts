import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { USayModule } from './u-say/u-say.module'

@Module({
  imports: [UsersModule, AuthModule, USayModule],
  providers: [],
  controllers: [],
  exports: [UsersModule, AuthModule],
})
export class RoutesModule {}
