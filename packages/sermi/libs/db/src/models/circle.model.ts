import {
  index,
  modelOptions,
  prop,
  Ref,
  ReturnModelType,
} from '@typegoose/typegoose'
import { BaseModel, Snowflake } from './base.model'
import { UserModel } from './user.model'

@modelOptions({
  options: { customName: 'Circle' },
})
@index([{ name: 1 }, { unique_name: 1 }])
export class CircleModel extends BaseModel.withTime {
  @prop()
  name: string

  @prop({ unique: true })
  unique_name: string

  @prop()
  description?: string
  @prop()
  icon: string
  @prop()
  banner: string

  @prop({ ref: () => UserModel })
  creator_id: Ref<UserModel>

  @prop({
    localField: 'creator_id',
    foreignField: '_id',
    ref: () => UserModel,
    justOne: true,
  })
  creator: UserModel

  @prop({ default: false })
  banned: boolean
  @prop({ default: false })
  private: boolean

  // TODO
  @prop()
  administrators: Snowflake[]
  serialize(options?: { omits?: string[] }) {
    return super.serialize({
      ...options,
      omits: ['banned', 'private'].concat(options?.omits),
    })
  }

  serializeForAdmin(): any {
    return super.serialize()
  }
}

export type CircleModelType = ReturnModelType<typeof CircleModel>
