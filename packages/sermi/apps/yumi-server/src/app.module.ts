import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { RoutesModule } from './modules/index.module'
import { HelperModule } from '@lib/utils/helper/helper.module'
import { DbModule } from '@lib/db'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { HttpCacheInterceptor } from './common/interceptors/http-cache.interceptors'

@Module({
  imports: [RoutesModule, HelperModule, DbModule],
  controllers: [AppController],
  providers: [{ provide: APP_INTERCEPTOR, useClass: HttpCacheInterceptor }],
})
export class AppModule {}
