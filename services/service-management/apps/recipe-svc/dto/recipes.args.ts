import { Max, Min } from 'class-validator';

export class RecipesArgs {
  @Min(0)
  skip = 0;

  @Min(1)
  @Max(50)
  take = 25;
}
