import { Component, effect, input } from '@angular/core';
import { recipe } from '../../shared/interfaces/recipe.interface';

@Component({
  selector: 'app-recipe-details',
  imports: [],
  templateUrl: './recipe-details.html',
  styleUrl: './recipe-details.scss',
})
export class RecipeDetails {
  showRecipe = input.required<recipe>();

  constructor() {
    effect(() => {
      console.log('showRecipe:', this.showRecipe());
    });
  }
}
