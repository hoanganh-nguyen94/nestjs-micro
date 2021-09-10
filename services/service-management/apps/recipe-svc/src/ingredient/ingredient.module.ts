import { Module } from '@nestjs/common';
import { ClientGrpcProxy, ClientProxyFactory } from '@nestjs/microservices';
import { ConfigService } from '../config/config.service';
import { IngredientTypeResolverService } from './ingredient-type-resolver.service';

@Module({
  providers: [
    ConfigService,
    IngredientTypeResolverService,
    {
      provide: 'INGREDIENT_SVC',
      useFactory: (configService: ConfigService): ClientGrpcProxy => {
        const svcOptions = configService.get('ingredientSvc');
        return ClientProxyFactory.create(svcOptions);
      },
      inject: [ConfigService]
    }
  ],
  exports: [IngredientTypeResolverService]

})
export class IngredientModule {
}
