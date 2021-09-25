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
  async ingredients(ingredientsArgs: IngredientsArgs): Promise<{ result: Ingredient[] }> {
    this.logger.log({ ingredientsArgs });
    return { result: await this.svc.findAll(ingredientsArgs) };
  }

  @GrpcMethod('IngredientService', 'findOneById')
  ingredient(args: { id: string }): { result: Ingredient } {
    return { result: this.svc.findOneById(args.id) };
  }

}
