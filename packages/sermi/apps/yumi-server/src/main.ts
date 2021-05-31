import { NestFactory } from '@nestjs/core'
import { fastifyAdpter } from './adapter/fastify'
import { AppModule } from './app.module'
import { __DEV__ } from './utils'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { Logger, ValidationPipe } from '@nestjs/common'
import { AllExceptionsFilter } from '@app/server/common/filters/any-exception.filter'
import { defaultValidatePipeOptions } from '@app/server/common/constants'
import { LoggingInterceptor } from '@app/server/common/interceptors/logging.interceptor'

const PORT = +process.env.PORT | 0 || 6161
const APIVersion = 1

async function bootstrap() {
  const app = await NestFactory.create(AppModule, fastifyAdpter)

  app.enableCors({ origin: true })
  app.useGlobalPipes(new ValidationPipe(defaultValidatePipeOptions))
  app.useGlobalFilters(new AllExceptionsFilter())
  app.useGlobalInterceptors(new LoggingInterceptor())

  if (__DEV__) {
    const options = new DocumentBuilder()
      .setTitle('API')
      .setVersion(`${APIVersion}`)
      .addSecurity('bearer', {
        type: 'http',
        scheme: 'bearer',
      })
      .addBearerAuth()
      .build()
    const document = SwaggerModule.createDocument(app, options)
    SwaggerModule.setup('api-docs', app, document)
  }
  await app.listen(PORT, '0.0.0.0', () => {
    if (__DEV__) {
      Logger.debug(`http://localhost:${PORT}/api-docs`)
    }
    Logger.log('Server is up.')
  })
}
bootstrap()
