import { IsValidPassword } from '@lib/utils/shared/validator-decorators/isValidPassword'
import { AutoIncrementID } from '@typegoose/auto-increment'
import {
  DocumentType,
  index,
  modelOptions,
  plugin,
  prop,
  ReturnModelType,
} from '@typegoose/typegoose'
import { hashSync } from 'bcrypt'
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUrl,
} from 'class-validator'
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
export class UserModel extends BaseModel.withTime {
  @prop({ unique: true })
  uid?: number
  @prop({ required: true, unique: true, maxlength: 20 })
  username: string
  @prop()
  @IsString()
  @IsNotEmpty()
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
  @IsString()
  @IsValidPassword()
  password: string
  @prop()
  @IsEmail()
  email: string
  @prop({ default: false })
  email_verified: boolean
  @prop()
  avatar?: string
  @IsUrl()
  @prop()
  banner?: string
  @prop()
  @IsString()
  @IsNotEmpty()
  introduce?: string
  @prop({ default: UserRole.User })
  @IsEnum(UserRole)
  role: UserRole

  @prop({ select: false, required: true })
  auth_code: string

  @prop()
  last_login_time?: Date

  @prop({ select: false })
  last_login_ip?: string

  @prop({ select: false, default: false })
  @IsBoolean()
  banned: boolean
  /**
   * 账户保护
   */
  @prop({ default: false })
  @IsBoolean()
  protected!: boolean

  serialize(options?: { omits?: string[] }): Partial<UserModel> {
    return super.serialize({
      ...options,
      omits: ['password', 'auth_code', 'banned'].concat(options?.omits),
    })
  }

  /**
   * 用户能直接修改的字段
   */
  static normalizeField: Partial<keyof UserModel>[] = [
    'name',
    'introduce',
    'avatar',
    'banner',
    'protected',
  ]

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

export type UserModelType = ReturnModelType<typeof UserModel>
