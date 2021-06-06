import { modelOptions, prop, ReturnModelType } from '@typegoose/typegoose'
import { BaseModel, Snowflake } from './base.model'

export enum ActionType {
  Like,
  Quote,
  Comment,
}

@modelOptions({
  options: { customName: 'u_say_interaction' },
})
export class USayInteractionModel extends BaseModel.default {
  @prop()
  circle_id?: Snowflake

  @prop()
  say_id: Snowflake

  @prop()
  action: ActionType

  @prop()
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
