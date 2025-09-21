import { recipe as recipeInterface } from '../interfaces/recipe.interface';

export const recipes: recipeInterface[] = [
  {
    _id: '1',
    pictureUrl:
      'https://images.openfoodfacts.org/images/products/301/776/047/2890/front_fr.84.full.jpg',
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
    pictureUrl:
      'https://t3.ftcdn.net/jpg/02/04/71/96/360_F_204719650_siRvDwqvAXBUojMkagvbROekcAFpLVo4.jpg',
    moment: ['midi'],
    name: 'Pates',
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
    pictureUrl:
      'https://www.club-sandwich.net/images/photorecettes/tartine-chevr-oeuf.jpg',
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
    pictureUrl:
      'https://maisonetdemeure.com/wp-content/uploads/2016/02/MD_a-table-recettes-salade-hivernale.jpg',
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
