import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ReturnModelType } from '@typegoose/typegoose'
import { UserModel } from '@lib/db/models/user.model'
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
    const user = await this.userModel.findById(payload.id).select('+authCode')

    return user && user.auth_code === payload.auth_code ? user : null
  }

  async signToken(id: string) {
    const { auth_code } = await this.userModel.findById(id).select('auth_code')
    const payload = {
      id,
      auth_code,
    }

    return this.jwtService.sign(payload)
  }

  // TODO
  async register(data: any) {
    return await this.userModel.create(data)
  }
}
