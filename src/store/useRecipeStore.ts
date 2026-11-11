
import { create } from "zustand";
import type { Recipe, RecipeInput } from "../types/Recipe";
import { getRecipes } from "../services/recipeService";
import { useAuthStore } from "./useAuthStore";

type RecipeStore = {
  recipesList: Recipe[];
  fetchingDishes: boolean;
  hasLoaded: boolean;
  loadError: string;
  loadRecipes: () => Promise<void>;
  addRecipe: (recipeDraft: RecipeInput) => number | null;
  editRecipe: (recipeId: number, updatedDish: RecipeInput) => boolean;
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
    const accountName = useAuthStore.getState().currentUser;

    if (!accountName) return null;

    const nextId =
      Math.max(0, ...get().recipesList.map((dish) => dish.id)) + 1;

    const newDish: Recipe = {
      ...recipeDraft,
      id: nextId,
      isUserRecipe: true,
      ownerId: accountName
    };

    set((current) => ({
      recipesList: [...current.recipesList, newDish]
    }));

    return nextId;
  },

  editRecipe: (recipeId, updatedDish) => {
    const accountName = useAuthStore.getState().currentUser;

    const pickedDish = get().recipesList.find(
      (dish) => dish.id === recipeId
    );

    if (
      !accountName ||
      pickedDish?.isUserRecipe !== true ||
      pickedDish.ownerId !== accountName
    ) {
      return false;
    }

    set((current) => ({
      recipesList: current.recipesList.map((dish) =>
        dish.id === recipeId
          ? {
              ...updatedDish,
              id: recipeId,
              isUserRecipe: true,
              ownerId: accountName
            }
          : dish
      )
    }));

    return true;
  },

  deleteRecipe: (recipeId) => {
    const accountName = useAuthStore.getState().currentUser;

    const pickedDish = get().recipesList.find(
      (dish) => dish.id === recipeId
    );

    if (
      !accountName ||
      pickedDish?.isUserRecipe !== true ||
      pickedDish.ownerId !== accountName
    ) {
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
