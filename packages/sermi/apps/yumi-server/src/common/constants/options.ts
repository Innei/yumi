import { ValidationPipeOptions } from '@nestjs/common'

export const defaultValidatePipeOptions: ValidationPipeOptions = Object.freeze({
  transform: true,
  whitelist: true,
  errorHttpStatusCode: 422,
  forbidUnknownValues: true,
  stopAtFirstError: true,
})
