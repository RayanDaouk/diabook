import { Injectable, signal } from '@angular/core';
import { recipe } from '../interfaces/recipe.interface';
import { recipes as initialRecipes } from '../data/recipes.data';

@Injectable({
  providedIn: 'root',
})
export class Recipe {
  recipes = signal<recipe[]>(initialRecipes);

  addRecipe(newRecipe: recipe) {
    this.recipes.update((current) => [...current, newRecipe]);
    console.log('liste de repas:', this.recipes());
  }
  updateRecipe(recipeId: string) {
    // this.recipes.update((current) =>
    //   current.map((recipe) =>
    //     recipe._id === recipeId ? { ...recipe, ...updatedRecipe } : recipe
    //   )
    // );
  }
  deleteRecipe(recipeId: string) {
    this.recipes.update((current) =>
      current.filter((recipe) => recipe._id !== recipeId)
    );
  }
}
