import { Module } from '@nestjs/common';
import { IngredientResolver } from './ingredient.resolver';
import { ClientGrpcProxy, ClientProxyFactory } from '@nestjs/microservices';
import { ConfigService } from '../config/config.service';
import { IngredientService } from './ingredient.services';
import { IngredientController } from './ingredient.controller';

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
  ],
  controllers: [IngredientController],

})
export class IngredientModule {
}
