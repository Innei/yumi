import { BaseModel } from './base.model'
import { prop } from '@typegoose/typegoose'
import { hashSync } from 'bcrypt'

export enum UserRole {
  User,
  Admin,
}

export class UserModel extends BaseModel {
  @prop({ required: true, unique: true, maxlength: 20 })
  username: string
  @prop()
  name: string

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
  @prop()
  emailVerified: boolean
  @prop()
  avatar?: string
  @prop()
  banner?: string
  @prop()
  introduce?: string
  @prop({ default: UserRole.User })
  role: UserRole

  @prop({ select: true, required: true })
  authCode!: string

  @prop()
  lastLoginTime?: Date

  @prop({ select: false })
  lastLoginIp?: string

  @prop()
  createdAt: Date

  @prop()
  updatedAt: Date | null

  @prop()
  banned: boolean
}
