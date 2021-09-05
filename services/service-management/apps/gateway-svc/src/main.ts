import { NestFactory } from '@nestjs/core';
import { GatewaySvcModule } from './gateway-svc.module';
import { ConfigService } from './config/config.service';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const port = new ConfigService().get('port');
  const host = new ConfigService().get('host');

  const app = await NestFactory.create(GatewaySvcModule);
  // app.use(
  //   cors({
  //     origin: '*',
  //     credentials: true
  //   })
  // )
  // await app.listen(3000);

  // app.connectMicroservice({
  //   transport: Transport.TCP,
  //   options: {
  //     retryAttempts: 5,
  //     retryDelay: 3000,
  //     host,
  //     port,
  //   },
  // });
  //
  // await app.startAllMicroservices();
  //
  // await app.listen((+port + 100), () => {
  //   Logger.log(`GATEWAY_SVC Listening at ${host}:${(+port + 100)}`);
  // });
  return app.listen((3000), () => {
    Logger.log(`GATEWAY_SVC Listening at ${host}:${3000}`);
  });

}

bootstrap();
