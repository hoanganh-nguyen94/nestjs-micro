import { Module } from '@nestjs/common';
import { RecipeSvcController } from './recipe-svc.controller';
import { RecipeSvcService } from './recipe-svc.service';
import { ServiceInfoService } from './service-info.service';
import { ServiceInfoController } from './service-info.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    })
  ],
  controllers: [
    RecipeSvcController,
    ServiceInfoController

  ],
  providers: [
    RecipeSvcService,
    ServiceInfoService
  ]
})
export class RecipeSvcModule {
}
