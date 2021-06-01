import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { DbModule } from '@lib/db'
import { LocalStrategy } from './local.strategy'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtStrategy } from './jwt.strategy'
import { APP } from '@app/server/app.config'

@Module({
  imports: [
    DbModule,
    JwtModule.registerAsync({
      useFactory() {
        return {
          secret: APP.jwtSecret || 'asdhaisouxcjzuoiqdnasjduw',
          signOptions: {
            expiresIn: '7d',
          },
        }
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
