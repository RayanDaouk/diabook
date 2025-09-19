import { Component, computed, effect, inject, signal } from '@angular/core';
import { Recipe as RecipeService } from '../../shared/services/recipe';
import { SubMenu } from '../sub-menu/sub-menu';
import { RouterLink } from '@angular/router';
import { RecipeDetails } from '../recipe-details/recipe-details';

@Component({
  selector: 'app-recipe-list',
  imports: [SubMenu, RouterLink, RecipeDetails],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.scss',
})
export class RecipeList {
  recipeService = inject(RecipeService);
  selectedRecipeId = signal<string | null>(null);
  recipeList = computed(() => {
    return this.recipeService.recipes();
  });

  recipes = computed(() => this.recipeService.recipes());

  selectedRecipe = computed(() =>
    this.recipes().find(({ _id }) => _id === this.selectedRecipeId())
  );

  setSelectedRecipe(id: string) {
    this.selectedRecipeId.set(id);
  }
  constructor() {
    effect(() => {
      console.log('recipes on list:', this.recipes());
    });
  }
}
