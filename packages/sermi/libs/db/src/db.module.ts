import { __TEST__ } from '@app/server/utils'
import { Global, Module } from '@nestjs/common'
import { appConfig } from 'configs'
import { TypegooseModule } from 'nestjs-typegoose'
import { CircleModel } from './models/circle.model'
import { USayInteractionModel } from './models/u-say-interaction.model'
import { USayModel } from './models/u-say.model'
import { UserModel } from './models/user.model'

const models = TypegooseModule.forFeature([
  UserModel,
  USayModel,
  CircleModel,
  USayInteractionModel,
])

const uri = __TEST__
  ? 'mongodb://localhost/__yumi_test__'
  : appConfig.mongo.uri || 'mongodb://localhost/yumi'
@Global()
@Module({
  imports: [
    TypegooseModule.forRootAsync({
      useFactory: () => ({
        uri,
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: true,
      }),
    }),
    models,
  ],
  exports: [models],
})
export class DbModule {}

export { UserModel }
