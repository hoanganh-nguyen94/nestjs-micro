import { Controller, Get, Param, Req } from '@nestjs/common';
import { Ingredient } from './models/ingredient.model';
import { IngredientsArgs } from './dto/ingredients.args';
import { iif, map, mergeMap, Observable, of, tap, throwError } from 'rxjs';
import { IngredientService } from './ingredient.services';


@Controller('ingredient')
export class IngredientController {

  constructor(private readonly ingredientService: IngredientService) {
  }

  @Get('')
  ingredients(@Req() args: IngredientsArgs): Observable<Ingredient[]> {
    return this.ingredientService.findAll(args).pipe(map(x => x?.result));
  }

  @Get(':id')
  ingredient(@Param('id') id: string): Observable<Ingredient> {

    return this.ingredientService.findOneById(id)
      .pipe(
        map(x => x?.result),
        mergeMap(v =>
          iif(
            () => !!(v),
            of(v),
            throwError('This is an error!')
          )
        ),
        tap(console.log)
      );

  }


}
