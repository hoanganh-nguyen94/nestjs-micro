import { Module } from '@nestjs/common';
import { IngredientSvcController } from './ingredient-svc.controller';
import { IngredientSvcService } from './ingredient-svc.service';
import { ServiceInfoService } from './service-info.service';
import { ServiceInfoController } from './service-info.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    })
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
