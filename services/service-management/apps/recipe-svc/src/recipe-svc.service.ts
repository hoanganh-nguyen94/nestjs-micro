import { Injectable } from '@nestjs/common';
import * as faker from 'faker';
import { Recipe } from './models/recipe.model';
import { RecipesArgs } from './dto/recipes.args';
import { IngredientTypeResolverService } from './ingredient/ingredient-type-resolver.service';
import { take } from 'rxjs';

const fakeData: Recipe[] = [
  {
    id: faker.datatype.uuid(),
    name: 'Tasty Schnitzel',
    description: 'A super-tasty Schnitzel - just awesome!',
    imagePath: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
    ingredientIds: ['2776da40-f07c-441c-aea7-55961ea15807', 'f93a0c7b-1a14-4de9-8073-7d7baf44d21b'],
    ingredients: [
      { id: '2776da40-f07c-441c-aea7-55961ea15807', name: 'Meat', amount: 1 },
      { id: 'f93a0c7b-1a14-4de9-8073-7d7baf44d21b', name: 'French Fries', amount: 20 }
    ]
  },
  {
    id: faker.datatype.uuid(),
    name: 'Big Fat Burger',
    description: 'What else you need to say?',
    imagePath: 'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
    ingredientIds: ['2776da40-f07c-441c-aea7-55961ea15807', 'c3a658a6-0456-4e49-aa22-13ab91c6d32d'],
    ingredients: [
      { id: '2776da40-f07c-441c-aea7-55961ea15807', name: 'Meat', amount: 1 },
      { id: 'c3a658a6-0456-4e49-aa22-13ab91c6d32d', name: 'Buns', amount: 2 }
    ]
  }

];


@Injectable()
export class RecipeSvcService {

  constructor(private ingredientTypeResolver: IngredientTypeResolverService) {
  }

  findOneById(id: string): Recipe {
    return fakeData.find(x => x.id === id) as Recipe || null;
  }

  findAll(args: RecipesArgs): Recipe[] {
    this.ingredientTypeResolver.findAll(args).pipe(take(1)).subscribe(console.log);
    return fakeData as Recipe[];
  }

}
