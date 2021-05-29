import { index, modelOptions, mongoose, plugin } from '@typegoose/typegoose'
import * as mongooseLeanVirtuals from 'mongoose-lean-virtuals'
import { IModelOptions } from '@typegoose/typegoose/lib/types'
import toJSON from '@yumi/utils/json'

export const defaultModelOptions: IModelOptions = {
  schemaOptions: {
    toJSON: {
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
      getters: true,
      virtuals: true,
      versionKey: false,
    },
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
