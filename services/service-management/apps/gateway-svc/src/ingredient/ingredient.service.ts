import { Inject, Injectable, Logger } from '@nestjs/common';
import { Ingredient } from './models/ingredient.model';
import { IngredientsArgs } from './dto/ingredients.args';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class IngredientService {
  private logger = new Logger('IngredientService');

  constructor(
    @Inject('INGREDIENT_SVC') private readonly client: ClientProxy
  ) {
  }

  findOneById(id: string): Observable<Ingredient> {
    const pattern = { cmd: 'INGREDIENT' };
    return this.client.send(pattern, id);
  }

  findAll(ingredientsArgs: IngredientsArgs): Observable<Ingredient[]> {
    const pattern = { cmd: 'LIST_INGREDIENT' };
    return this.client.send(pattern, ingredientsArgs);
  }

}
