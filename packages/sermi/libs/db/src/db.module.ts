import { __TEST__ } from '@app/server/utils'
import { Global, Module } from '@nestjs/common'
import { appConfig } from 'configs'
import { TypegooseModule } from 'nestjs-typegoose'
import { UserModel } from './models/user.model'
const models = TypegooseModule.forFeature([UserModel])

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
