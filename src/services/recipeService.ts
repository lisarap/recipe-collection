import axios from "axios";
import type { Recipe } from "../types/Recipe";

export async function getRecipes(): Promise<Recipe[]> {
  const response = await axios.get<Recipe[]>(
    `${import.meta.env.BASE_URL}data/recipes.json`
  );

  return response.data;
}