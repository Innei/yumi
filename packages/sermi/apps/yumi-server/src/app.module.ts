import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { RoutesModule } from './modules/index.module'
import { HelperModule } from '@lib/utils/helper/helper.module'
import { DbModule } from '@lib/db'

@Module({
  imports: [RoutesModule, HelperModule, DbModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
