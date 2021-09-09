import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Ingredient } from './models/ingredient.model';
import { IngredientsArgs } from './dto/ingredients.args';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class IngredientService implements OnModuleInit {
  private logger = new Logger('IngredientService');
  private svc: any;

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
