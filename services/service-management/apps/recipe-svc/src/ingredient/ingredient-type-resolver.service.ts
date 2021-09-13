import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { Ingredient } from '../../../gateway-svc-v2/src/ingredient/models/ingredient.model';
import { IngredientsArgs } from '../../../gateway-svc-v2/src/ingredient/dto/ingredients.args';


@Injectable()
export class IngredientTypeResolverService implements OnModuleInit {

  private svc;

  constructor(
    @Inject('INGREDIENT_SVC') private readonly client: ClientGrpc
  ) {
  }

  onModuleInit() {
    this.svc = this.client.getService('IngredientService');
  }

  findOneById(id: string): Observable<{ result: Ingredient }> {
    return this.svc.findOneById({ id });
  }

  findAll(ingredientsArgs: IngredientsArgs): Observable<{ result: Ingredient[] }> {
    return this.svc.findAll(ingredientsArgs);
  }
}
