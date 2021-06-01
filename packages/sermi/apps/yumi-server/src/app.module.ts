import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { RoutesModule } from './modules/index.module'
import { HelperModule } from './shared/helper/helper.module'

@Module({
  imports: [RoutesModule, HelperModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
