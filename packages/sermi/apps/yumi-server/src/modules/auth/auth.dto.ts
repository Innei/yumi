import { randomStringUnSafeSync } from '@app/server/utils'
import { UserModel } from '@lib/db'
import { ApiProperty } from '@nestjs/swagger'
import {
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator'

export class LoginDto {
  @IsString()
  username: string

  @IsString()
  password: string
}
// TODO 媒体类型用 URL 还是用 Snakeflow
export class RegisterDto implements Partial<UserModel> {
  @IsString()
  @MaxLength(20, { message: '用户名长度不能超过 20 位' })
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsAlphanumeric(undefined, { message: '用户名只能是字母数字' })
  @ApiProperty({
    example: randomStringUnSafeSync(6),
  })
  username: string
  @IsString()
  @IsNotEmpty({ message: '密码不能为空' })
  @MinLength(6, { message: '密码至少 6 位' })
  @ApiProperty({ example: 'abc123456' })
  password: string
  @IsEmail(undefined, { message: '错误的邮箱?' })
  @ApiProperty({ example: 'example@abc.com' })
  email: string

  @Length(4, 4, { message: 'code error' })
  @IsNumberString(undefined, { message: 'code error' })
  @ApiProperty({ example: '1111' })
  code: string

  @IsUrl()
  @IsOptional()
  banner?: string

  @IsUrl()
  @IsOptional()
  avatar?: string

  @IsString()
  @IsOptional()
  introduce?: string
}

export class VerificationDto {
  @IsEmail()
  email: string
}
