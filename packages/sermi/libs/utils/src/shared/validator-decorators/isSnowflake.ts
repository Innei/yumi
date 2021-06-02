import { Transform } from 'class-transformer'
import { ValidationOptions } from 'class-validator'
import { merge } from 'lodash'
import { validatorFactory } from './simpleValidatorFactory'

export function IsSnowflake(validationOptions?: ValidationOptions) {
  return validatorFactory(isSnowflake)(
    merge<ValidationOptions, ValidationOptions>(validationOptions || {}, {
      message: 'Snowflake ?',
    }),
  )
}

export const isSnowflake = (value: any) =>
  typeof value == 'string'
    ? /^\d{15,}$/.test(value)
    : typeof value == 'bigint'
    ? value.toString().length > 14
    : typeof value == 'number' && !Number.isNaN(value)
    ? value.toString().length > 14
    : false

export function TransformToBigInt() {
  return Transform(
    ({ value }) => {
      try {
        return BigInt(value)
      } catch {
        return value
      }
    },
    { toClassOnly: true },
  )
}
