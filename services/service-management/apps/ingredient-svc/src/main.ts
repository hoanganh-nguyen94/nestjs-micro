import { NestFactory } from '@nestjs/core';
import { IngredientSvcModule } from './ingredient-svc.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { join } from 'path';

// async function bootstrap() {
//   const port = new ConfigService().get('port');
//   const host = new ConfigService().get('host');
//
//   Logger.log(`Config: ${host}:${port}`);
//
//   const app = await NestFactory.create(IngredientSvcModule);
//
//
//   app.connectMicroservice<MicroserviceOptions>({
//     transport: Transport.GRPC,
//     options: {
//       url: `${process.env.GRPC_HOST}:${process.env.GRPC_PORT}`,
//       package: 'ingredient',
//       protoPath: join(__dirname, './_proto/ingredient.proto'),
//       loader: {
//         keepCase: true,
//         enums: String,
//         oneofs: true,
//         arrays: true
//       }
//     },
//   });
//   await app.startAllMicroservices();
//
//   await app.listen(+port + 100, () => {
//     Logger.log(`INGREDIENT_SVC Listening at ${host}:${Number(+port + 100)}`);
//   });
//
// }

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(IngredientSvcModule, {
    transport: Transport.GRPC,
    options: {
      url: `${process.env.GRPC_HOST}:${process.env.GRPC_PORT}`,
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
  Logger.log(`INGREDIENT_SVC Listening`);

  app.listen();
}
bootstrap();
