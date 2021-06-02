import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common'
import { ReturnModelType } from '@typegoose/typegoose'
import { UserModel } from '@lib/db/models/user.model'
import { InjectModel } from 'nestjs-typegoose'
import { compareSync } from 'bcrypt'
import { Snowflake } from '@lib/db/models/base.model'
import { randomStringSafe } from '@app/server/utils'
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserModel)
    private readonly model: ReturnModelType<typeof UserModel>,
  ) {}

  getUserById(id: Snowflake) {
    return this.model.findOne({ _id: id })
  }

  async patchUser(id: Snowflake, body: Partial<UserModel>) {
    return await this.model.updateOne({ _id: id }, body, {
      omitUndefined: true,
    })
  }

  async resetPassword(id: Snowflake, newPassword: string, oldPassword: string) {
    const user = await this.getUserById(id).select('+password')
    if (!user) {
      throw new UnprocessableEntityException('user not exist')
    }
    const password = user.password
    if (compareSync(oldPassword, password)) {
      user.password = newPassword
      user.auth_code = await randomStringSafe()
      await user.save()
    } else {
      throw new BadRequestException('password not corcert')
    }
  }
}
