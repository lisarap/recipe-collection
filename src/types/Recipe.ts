export type Recipe = {
  id: number;
  name: string;
  category: string;
  cookingTime: number;
  description: string;
  ingredients: string[];
  instructions: string[];
};