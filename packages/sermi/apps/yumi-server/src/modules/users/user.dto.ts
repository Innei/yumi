import { UserModel } from '@lib/db'
import { Snowflake } from '@lib/db/models/base.model'
import {
  IsSnowflake,
  TransformToBigInt,
} from '@lib/utils/shared/validator-decorators/isSnowflake'
import { IsValidPassword } from '@lib/utils/shared/validator-decorators/isValidPassword'
import { PartialType, PickType } from '@nestjs/mapped-types'
import { ApiProperty } from '@nestjs/swagger'
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator'
export class ByParamsDto {
  @IsString({ message: 'username defined ?' })
  @IsNotEmpty({ message: 'username ?' })
  username: string

  @IsInt({ message: 'uid ?' })
  @Min(1, { message: 'uid > 0 ?' })
  uid: number

  @IsSnowflake()
  @TransformToBigInt()
  @ApiProperty({ example: '563988163069952', type: 'string' })
  id: Snowflake
}

export class ResetPasswordDto {
  @IsValidPassword()
  new_password: string
  @IsValidPassword()
  old_password: string
}

export class IdDto extends PickType(ByParamsDto, ['id'] as const) {}
export class ByQueryDto extends PartialType(ByParamsDto) {}

export class PartialUserDto extends PartialType(UserModel) {}
