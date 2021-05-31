import {
  index,
  modelOptions,
  mongoose,
  plugin,
  prop,
} from '@typegoose/typegoose'
import * as mongooseLeanVirtuals from 'mongoose-lean-virtuals'
import * as mongooseLeanGetter from 'mongoose-lean-getters'
import { IModelOptions } from '@typegoose/typegoose/lib/types'

import { Long } from 'mongodb'
import longify = require('mongoose-long')
import toJSON from '../utils'
// @ts-ignore
longify(mongoose)

export type Snowflake = string | bigint

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
export abstract class BaseModel {
  @prop({
    type: mongoose.mongo.Long,
    required: true,
    // typegoose will gen a object without _id for query
    get: (val?: Long) => val && val.toString(),
    set: (val: Snowflake) => Long.fromString(val.toString()),
  })
  _id: Snowflake

  public get id(): Snowflake {
    return this._id
  }

  public set id(value: Snowflake) {
    this._id = value
  }
}
