import { Controller, Get, Logger } from '@nestjs/common';
import { IngredientSvcService } from './ingredient-svc.service';
import { MessagePattern } from '@nestjs/microservices';
import { IngredientsArgs } from '../dto/ingredients.args';
import { Ingredient } from '../models/ingredient.model';

@Controller()
export class IngredientSvcController {

  private logger = new Logger('IngredientController');

  constructor(private readonly svc: IngredientSvcService) {
  }


  @Get('ingredients')
  @MessagePattern({ cmd: 'LIST_INGREDIENT' })
  ingredients(ingredientsArgs: IngredientsArgs): Ingredient[] {
    this.logger.log({ ingredientsArgs });
    return this.svc.findAll(ingredientsArgs);
  }

  @MessagePattern({ cmd: 'INGREDIENT' })
  ingredient(id: string): Ingredient {
    return this.svc.findOneById(id);
  }

}
