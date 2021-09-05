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

  const microserviceTcp = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: `${process.env.GRPC_HOST}:${+process.env.GRPC_PORT+2}`,
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

  Logger.log(`RECIPE_SVC Listening GRPC at ${process.env.GRPC_HOST}:${+process.env.GRPC_PORT+2}`);

  await app.startAllMicroservices();
  await app.listen(port, () => {
    Logger.log(`RECIPE_SVC Listening at host: ${host} - port: ${port}`);
  });
}


// async function bootstrap() {
//   const app = await NestFactory.createMicroservice<MicroserviceOptions>(IngredientSvcModule, {
//     transport: Transport.GRPC,
//     options: {
//       url: `${process.env.GRPC_HOST}:${process.env.GRPC_PORT}`,
//       package: 'recipe',
//       protoPath: join(__dirname, './_proto/recipe.proto'),
//       loader: {
//         keepCase: true,
//         enums: String,
//         oneofs: true,
//         arrays: true
//       }
//     }
//   });
//   Logger.log(`RECIPE_SVC Listening at ${process.env.GRPC_HOST}:${process.env.GRPC_PORT}`);
//
//   app.listen();
// }
bootstrap();


