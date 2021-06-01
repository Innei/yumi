import { JwtAuthGuard } from '@app/server/common/guards/auth.guard'
import { UserDocument, UserModel } from '@lib/db/models/user.model'
import {
  Body,
  Controller,
  HttpCode,
  InternalServerErrorException,
  Post,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiOperation } from '@nestjs/swagger'
import { IpLocation, IpRecord } from '../../common/decorators/ip.decorator'
import { CurrentUser } from '../../common/decorators/user.decorator'
import { LoginDto, RegisterDto, VerificationDto } from './auth.dto'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: '登录' })
  @UseGuards(AuthGuard('local'))
  @HttpCode(200)
  async login(
    // 不用也要加上, 数据验证
    @Body() dto: LoginDto,
    @CurrentUser() user: UserDocument,
    @IpLocation() ipLocation: IpRecord,
  ): Promise<
    Omit<UserModel, 'password' | 'auth_code'> & {
      token: string
      expires_in: number
    }
  > {
    const omitted = user.serialize() as Omit<
      UserModel,
      'password' | 'auth_code'
    >

    user.last_login_ip = ipLocation.ip
    user.last_login_time = new Date()
    await user.save()

    return {
      token: await this.authService.signToken(user.id),
      ...omitted,
      expires_in: 7,
    }
  }

  @Post('register')
  @ApiOperation({ summary: '注册' })
  async register(@Body() body: RegisterDto): Promise<Partial<UserModel>> {
    const res = await this.authService.register(body)
    const payload = res.toObject()
    delete payload.password
    delete payload.auth_code
    return payload
  }

  @Post('verification')
  @ApiOperation({ summary: 'gen code' })
  async sendVerificationCode(@Body() body: VerificationDto) {
    throw new InternalServerErrorException()
  }

  // 检测 Token 有效性
  @Post('check')
  @UseGuards(JwtAuthGuard)
  checkToken(): string {
    return 'OK'
  }
}
