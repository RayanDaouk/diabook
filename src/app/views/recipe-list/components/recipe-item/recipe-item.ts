import { Component, computed, inject, input, model, output, signal } from '@angular/core';
import { recipe } from '../../../../shared/interfaces/recipe.interface';
import { Recipe as RecipeService } from '../../../../shared/services/recipe';

@Component({
  selector: 'app-recipe-item',
  imports: [],
  templateUrl: './recipe-item.html',
  styleUrl: './recipe-item.scss',
})
export class RecipeItem {
  recipe = input.required<recipe>();
  selectedRecipeId = model<string | null>();

  setSelectedRecipe(id: string) {
    this.selectedRecipeId.set(id);
  }
}
