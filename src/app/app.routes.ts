import { Routes } from '@angular/router';
import { Menu } from './components/menu/menu';

export const routes: Routes = [
  // {
  //   path: 'recipe/:id',
  //   loadComponent: async () =>
  //     (await import('./views/recipe-details/recipe-details')).RecipeDetails,
  //   pathMatch: 'full',
  // },
  {
    path: 'recipe-create',
    loadComponent: async () =>
      (await import('./views/admin/components/recipe-create/recipe-create'))
        .RecipeCreate,
    pathMatch: 'full',
  },
  {
    path: 'recipes-list',
    loadComponent: async () =>
      (await import('./views/recipe-list/recipe-list')).RecipeList,
    pathMatch: 'full',
  },
  {
    path: '',
    component: Menu,
    pathMatch: 'full',
  },
  {
    path: '**',
    component: Menu,
  },
  // {
  //   path: 'recipes-update',
  //   loadComponent: async () =>
  //     (await import('./views/recipe-list/recipe-list')).RecipeList,
  //   pathMatch: 'full',
  // },
];
