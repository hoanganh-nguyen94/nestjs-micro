import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { join } from 'path';
import { ConfigService } from './config/config.service';
import { RecipeSvcModule } from './recipe-svc.module';

async function bootstrap() {
  const port = new ConfigService().get('port');
  const host = new ConfigService().get('host');

  const app = await NestFactory.create(RecipeSvcModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: `${process.env.GRPC_HOST}:${+process.env.GRPC_PORT + 2}`,
      package: 'recipe',
      protoPath: join(__dirname, './_proto/recipe.proto'),
      loader: {
        keepCase: true,
        enums: String,
        oneofs: true,
        arrays: true
      }
    }
  });
  await app.startAllMicroservices();

  Logger.log(`RECIPE_SVC Listening at GRPC ${process.env.GRPC_HOST}:${+process.env.GRPC_PORT + 2}`);

  await app.listen(+port + 100, () => {
    Logger.log(`RECIPE_SVC Listening at ${host}:${Number(+port + 100)}`);
  });
}

bootstrap();
