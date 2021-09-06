import { Module } from '@nestjs/common';
import { GatewaySvcController } from './gateway-svc.controller';
import { GatewaySvcService } from './gateway-svc.service';
import { GraphQLModule } from '@nestjs/graphql';
import { VersionResolver } from './version.resolver';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    // IngredientModule,
    // RecipeModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    GraphQLModule.forRoot({
      debug: false,
      playground: true,
      installSubscriptionHandlers: true,
      autoSchemaFile: 'apps/gateway-svc/schema.gql',
      sortSchema: true,
      cors: false,
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
