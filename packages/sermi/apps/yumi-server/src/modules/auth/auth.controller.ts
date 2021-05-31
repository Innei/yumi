import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  UseGuards,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { ApiOperation } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'
import { CurrentUser } from '../../common/decorators/user.decorator'
import { IpLocation, IpRecord } from '../../common/decorators/ip.decorator'
import { LoginDto, RegisterDto, VerificationDto } from './auth.dto'
import { UserModel } from '@yumi/db'
import { DocumentType } from '@typegoose/typegoose'

export type UserDocument = DocumentType<UserModel>

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: '登录' })
  @UseGuards(AuthGuard('local'))
  async login(
    @Body() dto: LoginDto,
    @CurrentUser() user: UserDocument,
    @IpLocation() ipLocation: IpRecord,
  ) {
    const { name, username, created, url, mail } = user

    return {
      token: await this.authService.signToken(user._id),
      name,
      username,
      created,
      url,
      mail,
      expiresIn: 7,
    }
  }

  @Post('register')
  @ApiOperation({ summary: '注册' })
  async register(@Body() body: RegisterDto) {
    return ''
  }

  @Post('verification')
  @ApiOperation({ summary: 'gen code' })
  async sendVerificationCode(@Body() body: VerificationDto) {
    throw new InternalServerErrorException()
  }
}
