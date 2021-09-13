import { Controller, Get, Param, Req } from '@nestjs/common';
import { Ingredient } from './models/ingredient.model';
import { IngredientsArgs } from './dto/ingredients.args';
import { Observable } from 'rxjs';
import { IngredientResolver } from './ingredient.resolver';


@Controller('ingredient')
export class IngredientController {

  constructor(private readonly resolver: IngredientResolver) {
  }

  @Get('')
  ingredients(@Req() args: IngredientsArgs): Observable<Ingredient[]> {
    return this.resolver.ingredients(args);
  }

  @Get(':id')
  ingredient(@Param('id') id: string): Observable<Ingredient> {
    return this.resolver.ingredient(id);

  }


}
