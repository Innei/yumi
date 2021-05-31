import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ReturnModelType } from '@typegoose/typegoose'
import { UserModel } from '@yumi/db'
import { InjectModel } from 'nestjs-typegoose'
import { JwtPayload } from './jwt-payload.interface'
import { RegisterDto } from './auth.dto'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel)
    private readonly userModel: ReturnModelType<typeof UserModel>,
    private readonly jwtService: JwtService,
  ) {}

  async verifyPayload(payload: JwtPayload) {
    const user = await this.userModel.findById(payload._id).select('+authCode')

    return user && user.authCode === payload.authCode ? user : null
  }

  async signToken(_id: string) {
    const { authCode } = await this.userModel.findById(_id).select('authCode')
    const payload = {
      _id,
      authCode,
    }

    return this.jwtService.sign(payload)
  }

  async register(data: RegisterDto) {
    return await this.userModel.create(data)
  }
}
