import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Ingredient {
  @Field(type => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  amount?: number;


}
