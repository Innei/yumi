import { UserModel } from '@yumi/db'
import { IsEmail, IsString, IsUrl, MaxLength, MinLength } from 'class-validator'

export class UserLoginDto {
  @IsString()
  username: string
  @IsString()
  password: string
}

export class UserRegisterDto implements Partial<UserModel> {
  @MaxLength(20)
  @IsString()
  username: string
  @IsString()
  @MinLength(8)
  password: string
  @IsString()
  name?: string
  @IsUrl()
  avatar?: string
  @IsEmail()
  email?: string
}
