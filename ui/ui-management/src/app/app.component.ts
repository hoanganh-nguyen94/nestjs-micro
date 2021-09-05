import { Component } from '@angular/core';
import { VersionApisService } from './apis/version.apis.service';
import { IngredientApisService } from './apis/ingredient.apis.service';
import { RecipeApisService } from './apis/recipe.apis.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ui-management';
  result: any;

  constructor(
    private versionSvc: VersionApisService,
    private ingredientSvc: IngredientApisService,
    private recipeSvc: RecipeApisService
  ) {
  }

  getVersion() {
    this.versionSvc.version().subscribe(result => this.result = result);
  }

  getListIngredient() {
    this.ingredientSvc.ingredients().subscribe(result => this.result = result);
  }

  getListRecipe() {
    this.recipeSvc.recipes().subscribe(result => this.result = result);

  }
}
