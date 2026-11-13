
import { create } from "zustand";
import { persist } from "zustand/middleware";

type SavedRecipesStore = {
  savedByUser: Record<string, number[]>;
  toggleSaved: (accountName: string, recipeId: number) => void;
  forgetRecipe: (recipeId: number) => void;
};

export const useSavedRecipesStore = create<SavedRecipesStore>()(
  persist(
    (set) => ({
      savedByUser: {},

      toggleSaved: (accountName, recipeId) => {
        set((current) => {
          const savedIds = current.savedByUser[accountName] ?? [];
          const alreadySaved = savedIds.includes(recipeId);

          return {
            savedByUser: {
              ...current.savedByUser,
              [accountName]: alreadySaved
                ? savedIds.filter((id) => id !== recipeId)
                : [...savedIds, recipeId]
            }
          };
        });
      },

      forgetRecipe: (recipeId) => {
        set((current) => {
          const savedByUser = { ...current.savedByUser };

          for (const accountName of Object.keys(savedByUser)) {
            savedByUser[accountName] = savedByUser[accountName].filter(
              (id) => id !== recipeId
            );
          }

          return { savedByUser };
        });
      }
    }),
    {
      name: "goodfoodSavedRecipes"
    }
  )
);
