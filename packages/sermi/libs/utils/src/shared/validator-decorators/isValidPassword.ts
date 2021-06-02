import { isString } from '@typegoose/typegoose/lib/internal/utils'
import { ValidationOptions } from 'class-validator'
import { merge } from 'lodash'
import { validatorFactory } from './simpleValidatorFactory'

export function IsValidPassword(validationOptions?: ValidationOptions) {
  return validatorFactory(isValidPassword)(
    merge<ValidationOptions, ValidationOptions>(validationOptions || {}, {
      message: 'password valid, >= 8 ?',
    }),
  )
}

export const isValidPassword = (value: any) =>
  isString(value) && /^.{8,}$/.test(value)
