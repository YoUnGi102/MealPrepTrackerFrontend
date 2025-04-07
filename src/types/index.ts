export interface Ingredient {
  id: string;
  name: string;
  type: 'VEGETABLE' | 'MEAT' | 'FRUIT' | 'DAIRY' | 'GRAIN';
  protein: number;
  fat: number;
  carbs: number;
  sugar: number;
  image: string;
}
