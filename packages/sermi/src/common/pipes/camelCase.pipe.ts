import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common'
import camelcaseKeys = require('camelcase-keys')

@Injectable()
export class CamelCasePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return camelcaseKeys(value, { deep: true })
  }
}
