import {
  index,
  modelOptions,
  prop,
  Ref,
  ReturnModelType,
} from '@typegoose/typegoose'
import { BaseModel } from './base.model'
import { CircleModel } from './circle.model'
import { UserModel } from './user.model'

@modelOptions({
  options: { customName: 'u_say' },
})
@index([{ created_at: 1 }])
export class USayModel extends BaseModel.withTime {
  @prop({ ref: () => UserModel, required: true })
  uid: Ref<UserModel>
  // TODO 这里暂时不验证长度
  @prop()
  status?: string
  /**
   * 来源, e.g. From iOS
   * e.g. <a href="http://twitter.com" rel="nofollow">Twitter Web Client</a>
   */
  @prop()
  source?: string

  @prop({
    ref: () => CircleModel,
  })
  circle_id?: Ref<CircleModel>
  @prop({
    ref: () => CircleModel,
    justOne: true,
    localField: 'circle_id',
    foreignField: '_id',
  })
  circle: CircleModel

  @prop({
    ref: () => UserModel,
    foreignField: '_id',
    localField: 'uid',
    justOne: true,
  })
  user?: UserModel
  @prop()
  media: string[]
}

export type USayModelType = ReturnModelType<typeof USayModel>
