import { NotFoundException } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { RecipesArgs } from './dto/recipes.args';
import { Recipe } from './models/recipe.model';
import { RecipeService } from './recipe.service';
import { map, Observable, tap } from 'rxjs';

const pubSub = new PubSub();

@Resolver(of => Recipe)
export class RecipeResolver {
  constructor(private readonly recipesService: RecipeService) {
  }

  @Query(returns => Recipe)
  recipe(@Args('id') id: string): Observable<Recipe> {
    const recipe = this.recipesService.findOneById(id);
    if (!recipe) {
      throw new NotFoundException(id);
    }
    return recipe;
  }

  @Query(returns => [Recipe])
  recipes(@Args() args: RecipesArgs): Observable<Recipe[]> {
    return this.recipesService.findAll(args).pipe(
      tap(console.log),
      map(x => x?.result));
  }

  // @Mutation(returns => Recipe)
  // async addRecipe(
  //   @Args('newRecipeData') newRecipeData: NewRecipeInput
  // ): Promise<Recipe> {
  //   const recipe = await this.recipesService.create(newRecipeData);
  //   pubSub.publish('recipeAdded', { recipeAdded: recipe });
  //   return recipe;
  // }
  //
  // @Mutation(returns => Boolean)
  // async removeRecipe(@Args('id') id: string) {
  //   return this.recipesService.remove(id);
  // }
  //
  // @Subscription(returns => Recipe)
  // recipeAdded() {
  //   return pubSub.asyncIterator('recipeAdded');
  // }
}

// @Query(returns => Ingredient)
// ingredient(@Args('id') id: string): Observable<Ingredient> {
//   const ingredient = this.ingredientService.findOneById(id);
//   if (!ingredient) {
//   throw new NotFoundException(id);
// }
// return ingredient;
// }
//
// @Query(returns => [Ingredient])
// ingredients(@Args() ingredientsArgs: IngredientsArgs): Observable<Ingredient[]> {
//   return this.ingredientService.findAll(ingredientsArgs).pipe(map(x => x?.result));
// }
