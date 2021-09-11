import { NestFactory } from '@nestjs/core';
import { GatewaySvcModule } from './gateway-svc.module';
import { ConfigService } from './config/config.service';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const port = new ConfigService().get('port');
  const host = new ConfigService().get('host');

  const app = await NestFactory.create(GatewaySvcModule);
  app.enableCors({
    origin: '*',
  });
  return app.listen((3000), () => {
    Logger.log(`GATEWAY_SVC Listening at ${host}:${3000}`);
  });

}

bootstrap();
