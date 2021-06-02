import { AutoIncrementID } from '@typegoose/auto-increment'
import {
  index,
  modelOptions,
  plugin,
  prop,
  DocumentType,
} from '@typegoose/typegoose'
import { hashSync } from 'bcrypt'
import { BaseModel } from './base.model'
export enum UserRole {
  User,
  Admin,
  Root,
}
@plugin(AutoIncrementID, {
  field: 'uid',
  startAt: 10000,
})
@modelOptions({
  options: { customName: 'User' },
})
@index([{ uid: 1 }])
export class UserModel extends BaseModel {
  @prop({ unique: true })
  uid?: number
  @prop({ required: true, unique: true, maxlength: 20 })
  username: string
  @prop()
  name?: string

  @prop({
    required: true,
    minlength: 8,
    select: false,
    get(v) {
      return v
    },
    set(v) {
      return hashSync(v, 6)
    },
  })
  password: string
  @prop()
  email: string
  @prop({ default: false })
  email_verified: boolean
  @prop()
  avatar?: string
  @prop()
  banner?: string
  @prop()
  introduce?: string
  @prop({ default: UserRole.User })
  role: UserRole

  @prop({ select: false, required: true })
  auth_code: string

  @prop()
  last_login_time?: Date

  @prop({ select: false })
  last_login_ip?: string

  @prop({ default: () => new Date() })
  created_at: Date

  @prop()
  updated_at: Date | null

  @prop({ select: false, default: false })
  banned: boolean
  /**
   * 账户保护
   */
  @prop({ default: false })
  protected!: boolean

  serialize(options?: { omits?: string[] }): Partial<UserModel> {
    return super.serialize({
      ...options,
      omits: ['password', 'auth_code', 'banned'].concat(options?.omits),
    })
  }

  serializeForUser(): any {
    return super.serialize({
      omits: [
        'password',
        'auth_code',
        'banned',
        'email',
        'role',
        'email_verified',
        'last_login_ip',
        'last_login_time',
      ],
    })
  }
}

export type UserDocument = DocumentType<UserModel>
