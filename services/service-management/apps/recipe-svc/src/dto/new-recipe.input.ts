import { IsOptional, Length, MaxLength } from 'class-validator';
import { Ingredient } from '../models/ingredient.model';

export class NewRecipeInput {

  @MaxLength(30)
  name: string;

  @IsOptional()
  @Length(30, 255)
  description?: string;

  @IsOptional()
  @Length(30, 255)
  imagePath?: string;

  @IsOptional()
  ingredients?: Ingredient[];
}
