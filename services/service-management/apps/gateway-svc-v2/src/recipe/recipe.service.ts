import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { NewRecipeInput } from './dto/new-recipe.input';
import { Recipe } from './models/recipe.model';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { IngredientsArgs } from '../ingredient/dto/ingredients.args';

@Injectable()
export class RecipeService implements OnModuleInit {
  private svc: any;

  constructor(
    @Inject('RECIPE_SVC') private readonly client: ClientGrpc
  ) {
  }

  onModuleInit(): any {
    this.svc = this.client.getService('RecipeService');
  }


  async create(data: NewRecipeInput): Promise<Recipe> {
    return {} as any;
  }

  findOneById(id: string): Observable<Recipe> {
    return this.svc.findOneById(id);
  }


  findAll(args: IngredientsArgs): Observable<{ result: Recipe[] }> {
    return this.svc.findAll(args);
  }

  async remove(id: string): Promise<boolean> {
    return true;
  }
}

