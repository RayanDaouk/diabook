import { Component, effect, inject, input, signal } from '@angular/core';
import { recipe } from '../../shared/interfaces/recipe.interface';
import { Recipe as RecipeService } from '../../shared/services/recipe';
import { RecipeForm } from '../admin/components/recipe-form/recipe-form';

@Component({
  selector: 'app-recipe-details',
  imports: [RecipeForm],
  templateUrl: './recipe-details.html',
  styleUrl: './recipe-details.scss',
})
export class RecipeDetails {
  recipeService = inject(RecipeService);
  showRecipe = input.required<recipe>();
  editingRecipe = signal(false);
}
