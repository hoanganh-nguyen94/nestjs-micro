import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';
import { RecipeResolver } from './recipe.resolver';
import { RecipeService } from './recipe.service';
import { ConfigService } from '../config/config.service';
import { ClientProxyFactory } from '@nestjs/microservices';

@Module({
  providers: [RecipeResolver, RecipeService, DateScalar,
    ConfigService,
    {
      provide: 'RECIPE_SVC',
      useFactory: (configService: ConfigService) => {
        const svcOptions = configService.get('recipeSvc');
        return ClientProxyFactory.create(svcOptions);
      },
      inject: [ConfigService]
    }],
})
export class RecipeModule {
}
