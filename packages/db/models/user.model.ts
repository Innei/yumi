import { BaseModel } from './base.model'
import { prop } from '@typegoose/typegoose'
import { hashSync } from 'bcrypt'

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
  avatar?: string
  @prop()
  banner?: string
  @prop()
  introduce?: string
  @prop()
  // TODO role
  role?: string

  @prop({ select: true, required: true })
  authCode!: string

  @prop()
  lastLoginTime?: Date

  @prop({ select: false })
  lastLoginIp?: string
}
