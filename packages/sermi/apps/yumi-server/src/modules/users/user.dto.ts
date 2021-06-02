import { UserModel } from '@lib/db'
import { Snowflake } from '@lib/db/models/base.model'
import {
  IsEmail,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsString,
  IsUrl,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator'
import {
  IsSnowflake,
  TransformToBigInt,
} from '@lib/utils/shared/validator-decorators/isSnowflake'
import { PickType, PartialType } from '@nestjs/mapped-types'
import { Transform } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'
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

export class IdDto extends PickType(ByParamsDto, ['id'] as const) {}
export class ByQueryDto extends PartialType(ByParamsDto) {}
