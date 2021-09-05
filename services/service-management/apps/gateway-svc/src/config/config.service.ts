import { Transport } from '@nestjs/microservices';
import { join } from 'path';

export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null;

  constructor() {
    this.envConfig = {
      port: process.env.GATEWAY_SVC_PORT || 3000,
      host: process.env.GATEWAY_SVC_HOST || 'localhost'
    };
    this.envConfig.ingredientSvc = {
      transport: Transport.GRPC,
      options: {
        url: process.env.INGREDIENT_SVC_URL,
        package: 'ingredient',
        protoPath: join(__dirname, './_proto/ingredient.proto'),
        loader: {
          keepCase: true,
          enums: String,
          oneofs: true,
          arrays: true
        }
      }
    };
    this.envConfig.recipeSvc = {
      transport: Transport.TCP,
      options: {
        port: process.env.RECIPE_SVC_PORT || 3002,
        host: process.env.RECIPE_SVC_HOST || 'localhost'
      }
    };
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}
