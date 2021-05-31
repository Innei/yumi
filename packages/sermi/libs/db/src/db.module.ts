import { UserModel } from './models/user.model'
import { TypegooseModule } from 'nestjs-typegoose'
import { Global, Module } from '@nestjs/common'
import { ApplicationConfig } from 'config'
const models = TypegooseModule.forFeature([UserModel])

@Global()
@Module({
  imports: [
    TypegooseModule.forRootAsync({
      useFactory: () => ({
        uri: ApplicationConfig.mongo.uri || 'mongodb://localhost/yumi',
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
