import {
  index,
  modelOptions,
  mongoose,
  plugin,
  prop,
  DocumentType,
} from '@typegoose/typegoose'
import { IModelOptions } from '@typegoose/typegoose/lib/types'
import * as mongooseLeanGetter from 'mongoose-lean-getters'
import * as mongooseLeanVirtuals from 'mongoose-lean-virtuals'
import { transformer } from '../utils/transform'
import { toJSON } from '../utils'

import longify = require('mongoose-long')
// @ts-ignore
longify(mongoose)

export type Snowflake = bigint

export function serialize<T>(obj: T, options?: { omits?: string[] }): any {
  const doc = obj as DocumentType<T>
  return doc.toJSON(options as any)
}

const defaultSerializationOption: mongoose.DocumentToObjectOptions = {
  getters: true,
  virtuals: true,
  versionKey: false,
  transform(_, ret: any, options: any): any {
    const { omits } = options
    const projection = (omits || []).reduce(
      (p, omit) => {
        p[omit] = false
        return p
      },
      { _id: false, __v: false },
    )

    return toJSON(ret, projection)
  },
}
export const defaultModelOptions: IModelOptions = {
  schemaOptions: {
    toJSON: defaultSerializationOption,
    toObject: defaultSerializationOption,
    timestamps: false,
    versionKey: false,
  },
}

@plugin(mongooseLeanVirtuals)
// @ts-ignore
@plugin(mongooseLeanGetter)
@modelOptions(defaultModelOptions)
@index({ created: -1 })
abstract class Base {
  @prop({
    type: mongoose.mongo.Long,
    required: true,
    ...transformer.nullableSnowflake,
  })
  _id: Snowflake

  public get id(): Snowflake {
    return this._id
  }

  public set id(value: Snowflake) {
    this._id = value
  }

  public serialize(options?: { omits?: string[] }) {
    return serialize(this, options)
  }
}

abstract class BaseWithTimeField extends Base {
  @prop({ default: () => new Date() })
  created_at: Date

  @prop()
  updated_at: Date | null
}

export const BaseModel = Object.freeze({
  default: Base,
  withTime: BaseWithTimeField,
})
