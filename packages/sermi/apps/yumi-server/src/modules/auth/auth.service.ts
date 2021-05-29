import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ReturnModelType } from '@typegoose/typegoose'
import { UserModel } from '@yumi/db'
import { InjectModel } from 'nestjs-typegoose'
import { JwtPayload } from './jwt-payload.interface'

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
}
