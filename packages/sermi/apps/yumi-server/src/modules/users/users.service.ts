import { Injectable } from '@nestjs/common'
import { ReturnModelType } from '@typegoose/typegoose'
import { UserModel } from '@lib/db/models/user.model'
import { InjectModel } from 'nestjs-typegoose'
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserModel)
    private readonly model: ReturnModelType<typeof UserModel>,
  ) {}

  async getUser() {
    return await this.model.findOne({})
  }
}
