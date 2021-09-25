import { NestFactory } from '@nestjs/core';
import { IngredientSvcModule } from './ingredient-svc.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { join } from 'path';
import { ConfigService } from './config/config.service';


async function bootstrap() {
  const port = new ConfigService().get('port');
  const host = new ConfigService().get('host');

  const app = await NestFactory.create(IngredientSvcModule);


  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: `${process.env.GRPC_HOST}:${+process.env.GRPC_PORT+1}`,
      package: 'ingredient',
      protoPath: join(__dirname, './_proto/ingredient.proto'),
      loader: {
        keepCase: true,
        enums: String,
        oneofs: true,
        arrays: true
      }
    }
  });

  await app.startAllMicroservices();

  Logger.log(`INGREDIENT_SVC Listening at GRPC ${process.env.GRPC_HOST}:${+process.env.GRPC_PORT+1}`);

  await app.listen(+port + 100, () => {
    Logger.log(`INGREDIENT_SVC Listening at ${host}:${Number(+port + 100)}`);
  });
}

bootstrap();
