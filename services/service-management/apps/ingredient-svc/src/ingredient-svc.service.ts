import { Injectable } from '@nestjs/common';
import { Ingredient } from '../models/ingredient.model';
import { IngredientsArgs } from '../dto/ingredients.args';

const fakeData: Ingredient[] = [
  { id: "896d244f-8d0b-4ff8-a1ee-aab922c49876", name: 'Tomato' },
  { id: "e35bfa70-2021-4e43-a2c1-7c7b8f7d751e", name: 'Apple' },
  { id: "2776da40-f07c-441c-aea7-55961ea15807", name: 'Meat' },
  { id: "f93a0c7b-1a14-4de9-8073-7d7baf44d21b", name: 'French Fries' },
  { id: "c3a658a6-0456-4e49-aa22-13ab91c6d32d", name: 'Buns' }
];

@Injectable()
export class IngredientSvcService {


  findOneById(id: string): Ingredient {
    return fakeData.find(x => x.id === id) as Ingredient || null;
  }

  findAll(ingredientsArgs: IngredientsArgs): Ingredient[] {
    return fakeData as Ingredient[];
  }
}
