import { Controller, Get, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { IngredientsArgs } from '../../ingredient-svc/src/dto/ingredients.args';
import { Ingredient } from '../../ingredient-svc/src/models/ingredient.model';
import { RecipeSvcService } from './recipe-svc.service';

@Controller()
export class RecipeSvcController {

  private logger = new Logger('RecipeController');

  constructor(private readonly svc: RecipeSvcService) {
  }


  @Get('recipes')
  @MessagePattern({ cmd: 'LIST_RECIPE' })
  ingredients(ingredientsArgs: IngredientsArgs): Ingredient[] {
    this.logger.log({ ingredientsArgs });
    return this.svc.findAll(ingredientsArgs);
  }

  @MessagePattern({ cmd: 'RECIPE' })
  ingredient(id: string): Ingredient {
    return this.svc.findOneById(id);
  }
}
