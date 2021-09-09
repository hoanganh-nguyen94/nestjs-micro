import { NotFoundException } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { Ingredient } from './models/ingredient.model';
import { IngredientsArgs } from './dto/ingredients.args';
import { iif, map, mergeMap, Observable, of, throwError } from 'rxjs';
import { IngredientService } from './ingredient.services';

const pubSub = new PubSub();

@Resolver(of => Ingredient)
export class IngredientResolver {
  constructor(private readonly ingredientService: IngredientService) {
  }

  @Query(returns => Ingredient)
  ingredient(@Args('id') id: string): Observable<Ingredient> {
    return this.ingredientService.findOneById(id)
      .pipe(
        map(x => x?.result),
        mergeMap(v =>
          iif(
            () => !!(v),
            of(v),
            throwError(new NotFoundException(id))
          )
        )
      );
  }

  @Query(returns => [Ingredient])
  ingredients(@Args() ingredientsArgs: IngredientsArgs): Observable<Ingredient[]> {
    return this.ingredientService.findAll(ingredientsArgs).pipe(map(x => x?.result));
  }

}
