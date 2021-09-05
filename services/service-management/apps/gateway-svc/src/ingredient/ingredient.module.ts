import { Module } from '@nestjs/common';
import { IngredientResolver } from './ingredient.resolver';
import { IngredientService } from './ingredient.service';
import { ClientGrpcProxy, ClientProxyFactory } from '@nestjs/microservices';
import { ConfigService } from '../config/config.service';

@Module({
  imports: [],
  providers: [
    IngredientResolver,
    IngredientService,
    ConfigService,
    {
      provide: 'INGREDIENT_SVC',
      useFactory: (configService: ConfigService): ClientGrpcProxy => {
        const svcOptions = configService.get('ingredientSvc');
        return ClientProxyFactory.create(svcOptions);
      },
      inject: [ConfigService]
    }

  ]
})
export class IngredientModule {
}
