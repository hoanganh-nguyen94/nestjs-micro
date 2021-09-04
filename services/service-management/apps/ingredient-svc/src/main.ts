import { NestFactory } from '@nestjs/core';
import { IngredientSvcModule } from './ingredient-svc.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { ConfigService } from '../config/config.service';

async function bootstrap() {
  const port = new ConfigService().get('port');
  const host = new ConfigService().get('host');

  Logger.log(`Config: ${host}:${port}`);

  const app = await NestFactory.create(IngredientSvcModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      port,
      host
    }
  });
  await app.startAllMicroservices();
  await app.listen(+port + 100, () => {
    Logger.log(`INGREDIENT_SVC Listening at ${host}:${Number(+port + 100)}`);
  });

}

bootstrap();
