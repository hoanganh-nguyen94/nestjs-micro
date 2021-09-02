import { Inject, Injectable } from '@nestjs/common';
import { NewRecipeInput } from './dto/new-recipe.input';
import { RecipesArgs } from './dto/recipes.args';
import { Recipe } from './models/recipe.model';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class RecipeService {
  constructor(
    @Inject('RECIPE_SVC') private readonly client: ClientProxy
  ) {
  }

  async create(data: NewRecipeInput): Promise<Recipe> {
    return {} as any;
  }

  findOneById(id: string): Observable<Recipe> {
    const pattern = { cmd: 'RECIPE' };
    return this.client.send(pattern, id);
  }

  findAll(ingredientsArgs: RecipesArgs): Observable<Recipe[]> {
    const pattern = { cmd: 'LIST_RECIPE' };
    return this.client.send(pattern, ingredientsArgs);
  }

  async remove(id: string): Promise<boolean> {
    return true;
  }
}
