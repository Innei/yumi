import { Injectable } from '@nestjs/common'
import { ReturnModelType } from '@typegoose/typegoose'
import { UserModel } from '@lib/db/models/user.model'
import { InjectModel } from 'nestjs-typegoose'
import { Snowflake } from '@lib/db/models/base.model'
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserModel)
    private readonly model: ReturnModelType<typeof UserModel>,
  ) {}

  async getUserById(id: Snowflake) {
    return await this.model.findOne({ _id: id })
  }
}
