import { Ingredient } from './ingredient.model';

export class Recipe {
  id: string;

  name: string;

  imagePath?: string;

  description?: string;

  ingredientIds?: string[];

  ingredients?: Ingredient[];

}
