import { Injectable, UnprocessableEntityException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ReturnModelType } from '@typegoose/typegoose'
import { UserModel, UserRole } from '@lib/db/models/user.model'
import { InjectModel } from 'nestjs-typegoose'
import { JwtPayload } from './jwt-payload.interface'
import { RegisterDto } from './auth.dto'
import { randomString, snowflake } from '@app/server/utils'
import { Snowflake } from '@lib/db/models/base.model'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel)
    private readonly userModel: ReturnModelType<typeof UserModel>,
    private readonly jwtService: JwtService,
  ) {}

  async verifyPayload(payload: JwtPayload) {
    const user = await this.userModel.findById(payload.id).select('+auth_code')

    return user && user.auth_code === payload.auth_code ? user : null
  }

  async signToken(id: Snowflake) {
    const { auth_code } = await this.userModel.findById(id).select('auth_code')
    const payload = {
      id,
      auth_code,
    }

    return this.jwtService.sign(payload)
  }

  // TODO 验证码
  async register(
    model: Partial<UserModel> &
      Pick<UserModel, 'username' | 'password' | 'email'>,
  ) {
    // 先看看存不存在
    const exist =
      (await this.userModel.countDocuments({
        username: model.username,
      })) > 0
    if (exist) {
      throw new UnprocessableEntityException('用户已存在!')
    }
    const auth_code = await randomString(6)
    return await this.userModel.create({
      _id: snowflake.gen(),
      ...model,
      auth_code,
      banned: false,
      created_at: new Date(),
      email_verified: false,
      role: UserRole.User,
      updated_at: null,
    })
  }

  /**
   * 更新用户上次登陆的 IP
   */
  async updateUserLastMeta(
    id: Snowflake,
    meta: Required<Pick<UserModel, 'last_login_ip'>>,
  ) {
    await this.userModel.updateOne(
      { _id: id },
      { ...meta, last_login_time: new Date() },
    )
  }
}
