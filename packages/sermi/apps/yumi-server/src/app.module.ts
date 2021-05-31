import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { RoutesModule } from './modules/index.module'

@Module({
  imports: [RoutesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
