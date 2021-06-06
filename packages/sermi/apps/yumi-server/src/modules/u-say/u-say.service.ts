import { UserModel } from '@lib/db'
import { CircleModel, CircleModelType } from '@lib/db/models/circle.model'
import {
  USayInteractionModel,
  USayInteractionModelType,
} from '@lib/db/models/u-say-interaction.model'
import { USayModel, USayModelType } from '@lib/db/models/u-say.model'
import { UserModelType } from '@lib/db/models/user.model'
import { Injectable } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'

@Injectable()
export class USayService {
  constructor(
    @InjectModel(USayModel) private readonly uSayModel: USayModelType,
    @InjectModel(USayInteractionModel)
    private readonly uSayInteractionModel: USayInteractionModelType,
    @InjectModel(UserModel) private readonly userModel: UserModelType,
    @InjectModel(CircleModel) private readonly circleModel: CircleModelType,
  ) {}
}
