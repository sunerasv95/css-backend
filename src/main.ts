import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';

const serverConfig = config.get('server');

async function bootstrap() {
  const port = process.env.APP_PORT || serverConfig.port;
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
}
bootstrap();
