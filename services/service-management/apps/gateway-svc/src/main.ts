import { NestFactory } from '@nestjs/core';
import { GatewaySvcModule } from './gateway-svc.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const port = new ConfigService().get('port');
  const host = new ConfigService().get('host');

  const app = await NestFactory.create(GatewaySvcModule);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      retryAttempts: 5,
      retryDelay: 3000,
      host,
      port,
    },
  });

  await app.startAllMicroservices();

  await app.listen((+port + 100), () => {
    Logger.log(`GATEWAY_SVC Listening at ${host}:${(+port + 100)}`);
  });

}

bootstrap();
