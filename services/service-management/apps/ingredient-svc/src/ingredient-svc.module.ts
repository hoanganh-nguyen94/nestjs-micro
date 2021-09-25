import { CacheModule, Module } from '@nestjs/common';
import { IngredientSvcController } from './ingredient-svc.controller';
import { IngredientSvcService } from './ingredient-svc.service';
import { ServiceInfoService } from './service-info.service';
import { ServiceInfoController } from './service-info.controller';
import { ConfigModule } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    CacheModule.register(
      {
        store: redisStore,
        host: process.env.INGREDIENT_DB_HOST,
        port: process.env.INGREDIENT_DB_PORT,
      }
    )
  ],
  controllers: [
    IngredientSvcController,
    ServiceInfoController
  ],
  providers: [
    IngredientSvcService,
    ServiceInfoService
  ]
})
export class IngredientSvcModule {
}
