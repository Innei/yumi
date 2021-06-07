import {
  index,
  modelOptions,
  prop,
  ReturnModelType,
} from '@typegoose/typegoose'
import { transformer } from '../utils'
import { BaseModel, Snowflake } from './base.model'

export enum ActionType {
  Like,
  Quote,
  Comment,
}

@modelOptions({
  options: { customName: 'u_say_interaction' },
  schemaOptions: { _id: false },
})
@index([{ say_id: 1 }])
export class USayInteractionModel {
  @prop({ ...transformer.nullableSnowflake })
  circle_id?: Snowflake

  @prop({ ...transformer.nullableSnowflake })
  say_id: Snowflake

  @prop()
  action: ActionType

  @prop({ ...transformer.nullableSnowflake })
  uid: Snowflake
  /**
   * 操作的时间
   */
  @prop()
  time: Date
  /**
   * 是否被撤销
   */
  @prop()
  revoke: boolean
}

export type USayInteractionModelType = ReturnModelType<
  typeof USayInteractionModel
>
