import { Module } from '@nestjs/common';
import { GatewaySvcController } from './gateway-svc.controller';
import { GatewaySvcService } from './gateway-svc.service';
import { GraphQLModule } from '@nestjs/graphql';
import { IngredientModule } from './ingredient/ingredient.module';
import { VersionResolver } from './version.resolver';
import { ConfigModule } from '@nestjs/config';
import { RecipeModule } from './recipe/recipe.module';

@Module({
  imports: [
    IngredientModule,
    RecipeModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    GraphQLModule.forRoot({
      debug: false,
      playground: true,
      installSubscriptionHandlers: true,
      autoSchemaFile: 'apps/gateway-svc/schema.gql',
      sortSchema: true
    })
  ],
  controllers: [GatewaySvcController],
  providers: [
    GatewaySvcService,
    VersionResolver
  ]
})
export class GatewaySvcModule {
}
