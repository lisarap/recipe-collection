
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
  editRecipe: (
  recipeId: number,
  updatedDish: Omit<Recipe, "id" | "isUserRecipe">
  ) => boolean;
  deleteRecipe: (recipeId: number) => boolean;
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
      id: nextId,
      isUserRecipe: true
    };

    set((current) => ({
      recipesList: [...current.recipesList, newDish]
    }));

    return nextId;
  },

  editRecipe: (recipeId, updatedDish) => {
  const pickedDish = get().recipesList.find(
    (dish) => dish.id === recipeId
  );

  if (!pickedDish || !pickedDish.isUserRecipe) {
    return false;
  }

  set((current) => ({
    recipesList: current.recipesList.map((dish) =>
      dish.id === recipeId
        ? { ...updatedDish, id: recipeId, isUserRecipe: true }
        : dish
    )
  }));

  return true;
  },
  
  deleteRecipe: (recipeId) => {
  const pickedDish = get().recipesList.find(
    (dish) => dish.id === recipeId
  );

  if (!pickedDish || !pickedDish.isUserRecipe) {
    return false;
  }

  set((current) => ({
    recipesList: current.recipesList.filter(
      (dish) => dish.id !== recipeId
    )
  }));

  return true;
}

}));
