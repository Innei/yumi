import { index, modelOptions, mongoose, plugin } from '@typegoose/typegoose'
import * as mongooseLeanVirtuals from 'mongoose-lean-virtuals'
import { IModelOptions } from '@typegoose/typegoose/lib/types'

export const defaultModelOptions: IModelOptions = {
  schemaOptions: {
    toJSON: {
      getters: true,
      virtuals: true,
      versionKey: false,
    },
    toObject: { getters: true, virtuals: true, versionKey: false },
    timestamps: false,
    versionKey: false,
  },
}

@plugin(mongooseLeanVirtuals)
@modelOptions(defaultModelOptions)
@index({ created: -1 })
export abstract class BaseModel {
  id: mongoose.Types.ObjectId
  _id: mongoose.Types.ObjectId
}
