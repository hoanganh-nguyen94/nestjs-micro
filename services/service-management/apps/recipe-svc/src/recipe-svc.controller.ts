import { Controller, Get, Logger } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { RecipeSvcService } from './recipe-svc.service';
import { RecipesArgs } from './dto/recipes.args';
import { Recipe } from './models/recipe.model';

@Controller()
export class RecipeSvcController {

  private logger = new Logger('RecipeController');

  constructor(private readonly svc: RecipeSvcService) {
  }

  @Get('recipes')
  @GrpcMethod('RecipeService', 'findAll')
  recipes(args: RecipesArgs): { result: Recipe[] } {
    this.logger.log({ args });
    return { result: this.svc.findAll(args) };
  }

  @GrpcMethod('RecipeService', 'findOneById')
  recipe(id: string): Recipe {
    return this.svc.findOneById(id);
  }

}
