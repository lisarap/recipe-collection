
import { create } from "zustand";
import type { Recipe } from "../types/Recipe";
import { getRecipes } from "../services/recipeService";

type RecipeStore = {
  recipesList: Recipe[];
  fetchingDishes: boolean;
  hasLoaded: boolean;
  loadError: string;
  loadRecipes: () => Promise<void>;
  addRecipe: (recipeDraft: Omit<Recipe, "id">) => number;
};

export const useRecipeStore = create<RecipeStore>((set, get) => ({
  recipesList: [],
  fetchingDishes: false,
  hasLoaded: false,
  loadError: "",

  loadRecipes: async () => {
    if (get().hasLoaded || get().fetchingDishes) return;

    set({ fetchingDishes: true, loadError: "" });

    try {
      const savedDishes = await getRecipes();

      set({
        recipesList: savedDishes,
        hasLoaded: true
      });
    } catch {
      set({ loadError: "Couldn't load recipes. Please try again." });
    } finally {
      set({ fetchingDishes: false });
    }
  },

  addRecipe: (recipeDraft) => {
    const nextId =
      Math.max(0, ...get().recipesList.map((dish) => dish.id)) + 1;

    const newDish = {
      ...recipeDraft,
      id: nextId
    };

    set((current) => ({
      recipesList: [...current.recipesList, newDish]
    }));

    return nextId;
  }
}));
