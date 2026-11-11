
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RecipeForm from "../components/RecipeForm";
import { useRecipeStore } from "../store/useRecipeStore";
import type { RecipeInput } from "../types/Recipe";

function AddRecipe() {
  const navigate = useNavigate();

  const { addRecipe, hasLoaded, fetchingDishes, loadError } =
    useRecipeStore();

  const [saveError, setSaveError] = useState("");

  function saveNewDish(recipeDraft: RecipeInput) {
    const newRecipeId = addRecipe(recipeDraft);

    if (newRecipeId === null) {
      setSaveError("Please log in before adding a recipe.");
      return;
    }

    navigate(`/recipes/${newRecipeId}`, {
      state: { notice: "Recipe added successfully." }
    });
  }

  if (loadError) {
    return <p role="alert">{loadError}</p>;
  }

  if (!hasLoaded || fetchingDishes) {
    return <p role="status">Loading recipes...</p>;
  }

  return (
    <section className="add-recipe-page">
      <h1>Add a New Recipe</h1>
      <p>Share one of your favourite recipes.</p>

      {saveError && <p role="alert">{saveError}</p>}

      <RecipeForm
        onSave={saveNewDish}
        buttonText="Add Recipe"
      />
    </section>
  );
}

export default AddRecipe;
