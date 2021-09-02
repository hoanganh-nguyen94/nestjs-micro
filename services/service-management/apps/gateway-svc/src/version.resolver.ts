import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class VersionResolver {

  @Query(() => String)
  version(): string {
    return 'v1';
  }
}
