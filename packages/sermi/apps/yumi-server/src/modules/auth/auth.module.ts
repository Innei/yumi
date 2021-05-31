import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { DbModule } from '@lib/db'
import { LocalStrategy } from './local.strategy'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtStrategy } from './jwt.strategy'

const jwtModule = JwtModule.registerAsync({
  useFactory() {
    return {
      secret: process.env.SECRET || 'asdhaisouxcjzuoiqdnasjduw',
      signOptions: {
        expiresIn: '7d',
      },
    }
  },
})

@Module({
  imports: [DbModule, jwtModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  exports: [JwtStrategy, LocalStrategy],
})
export class AuthModule {}
