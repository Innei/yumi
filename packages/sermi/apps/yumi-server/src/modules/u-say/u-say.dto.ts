import { Limits } from '@app/server/common/constants/system.constant'
import { USayModel } from '@lib/db/models/u-say.model'
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator'

export class USayDto implements Partial<USayModel> {
  @IsString()
  @MaxLength(Limits.uSay.max)
  @IsNotEmpty()
  @IsOptional()
  status?: string
}
