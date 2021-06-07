import { snowflake } from '@app/server/utils'
import { UserModel } from '@lib/db'
import { Snowflake } from '@lib/db/models/base.model'
import { CircleModel, CircleModelType } from '@lib/db/models/circle.model'
import {
  ActionType,
  USayInteractionModel,
  USayInteractionModelType,
} from '@lib/db/models/u-say-interaction.model'
import { USayModel, USayModelType } from '@lib/db/models/u-say.model'
import { UserModelType } from '@lib/db/models/user.model'
import { Injectable } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { USayDto } from './u-say.dto'

@Injectable()
export class USayService {
  constructor(
    @InjectModel(USayModel) private readonly uSayModel: USayModelType,
    @InjectModel(USayInteractionModel)
    private readonly uSayInteractionModel: USayInteractionModelType,
    @InjectModel(UserModel) private readonly userModel: UserModelType,
    @InjectModel(CircleModel) private readonly circleModel: CircleModelType,
  ) {}

  async newSay(uid: Snowflake, body: USayDto) {
    const uSayId = snowflake.gen()

    const doc = await this.uSayModel.create({
      ...body,
      _id: uSayId,
      created_at: new Date(),
      uid: uid,
      updated_at: null,
      circle_id: null,
    })

    return doc
  }
}
