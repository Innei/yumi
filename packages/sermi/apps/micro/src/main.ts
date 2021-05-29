import { NestFactory } from '@nestjs/core';
import { MicroModule } from './micro.module';

async function bootstrap() {
  const app = await NestFactory.create(MicroModule);
  await app.listen(3000);
}
bootstrap();
