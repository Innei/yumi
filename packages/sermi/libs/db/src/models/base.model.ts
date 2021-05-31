import {
  index,
  modelOptions,
  mongoose,
  plugin,
  prop,
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
    ...transformer.nullableSnowflake,
  })
  _id: Snowflake

  public get id(): Snowflake {
    return this._id
  }

  public set id(value: Snowflake) {
    this._id = value
  }
}
