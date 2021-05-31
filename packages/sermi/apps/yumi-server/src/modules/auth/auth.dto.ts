import { ApiProperty } from '@nestjs/swagger'
import {
  IsEmail,
  IsNotEmpty,
  IsString,
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

export class RegisterDto {
  @IsString()
  @MaxLength(20)
  @IsNotEmpty()
  username: string
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string
  @IsEmail()
  email: string
  @IsString()
  @Length(4)
  code: string
}

export class VerificationDto {
  @IsEmail()
  email: string
}
