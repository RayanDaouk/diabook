import { recipe as recipeInterface } from '../interfaces/recipe.interface';

export const recipes: recipeInterface[] = [
  {
    _id: '1',
    moment: ['matin'],
    name: 'Bellvita',
    ingredients: ['Céréales, chocolat'],
    insulins: [
      {
        name: 'Liumjev',
        units: 8.5,
      },
    ],
    infos: 'Bellvita -30% de sucre',
  },
  {
    _id: '2',
    moment: ['midi'],
    name: 'Pattes',
    ingredients: ['Céréales complètes'],
    insulins: [
      {
        name: 'Humalog',
        units: 9,
      },
    ],
    infos: 'Avec fromage rapé',
  },
  {
    _id: '3',
    moment: ['soir'],
    name: 'Tartines fromages',
    ingredients: ['10 créréales'],
    insulins: [
      {
        name: 'Humalog',
        units: 6,
      },
    ],
    infos: 'Pain magique intermarché',
  },
  {
    _id: '4',
    moment: ['matin', 'midi', 'soir'],
    name: 'Salade',
    ingredients: ['salades', 'comté', 'olives', "huile d'olive", '1 tartine'],
    insulins: [
      {
        name: 'Humalog',
        units: 1,
      },
    ],
    infos: 'Délicieux',
  },
];
