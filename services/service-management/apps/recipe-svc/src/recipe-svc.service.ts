import { Injectable } from '@nestjs/common';
import * as faker from 'faker';
import { Recipe } from '../models/recipe.model';
import { RecipesArgs } from '../dto/recipes.args';

const fakeData: Recipe[] = [
  {
    id: faker.datatype.uuid(),
    name: 'Tasty Schnitzel',
    description: 'A super-tasty Schnitzel - just awesome!',
    imagePath: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
    ingredients: [
      { id: faker.datatype.uuid(), name: 'Meat', amount: 1 },
      { id: faker.datatype.uuid(), name: 'French Fries', amount: 20 }
    ]
  },
  {
    id: faker.datatype.uuid(),
    name: 'Big Fat Burger',
    description: 'What else you need to say?',
    imagePath: 'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
    ingredients: [
      { id: faker.datatype.uuid(), name: 'Meat', amount: 1 },
      { id: faker.datatype.uuid(), name: 'Buns', amount: 2 }
    ]
  }

];


@Injectable()
export class RecipeSvcService {

  findOneById(id: string): Recipe {
    return fakeData.find(x => x.id === id) as Recipe || null;
  }

  findAll(args: RecipesArgs): Recipe[] {
    return fakeData as Recipe[];
  }

}
