import { Controller, Get, Logger } from '@nestjs/common';
import { IngredientSvcService } from './ingredient-svc.service';
import { GrpcMethod } from '@nestjs/microservices';
import { IngredientsArgs } from './dto/ingredients.args';
import { Ingredient } from './models/ingredient.model';

@Controller()
export class IngredientSvcController {

  private logger = new Logger('IngredientController');

  constructor(private readonly svc: IngredientSvcService) {
  }


  @Get('ingredients')
  @GrpcMethod('IngredientService', 'findAll')
  ingredients(ingredientsArgs: IngredientsArgs): { result: Ingredient[] } {
    this.logger.log({ ingredientsArgs });
    return { result: this.svc.findAll(ingredientsArgs) };
  }

  @GrpcMethod('IngredientService', 'findOneById')
  ingredient(id: string): { result: Ingredient } {
    return { result: this.svc.findOneById(id) };
  }

}
