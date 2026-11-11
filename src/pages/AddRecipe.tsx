
import { useNavigate } from "react-router-dom";
import RecipeForm from "../components/RecipeForm";
import { useRecipeStore } from "../store/useRecipeStore";
import type { Recipe } from "../types/Recipe";

function AddRecipe() {
  const navigate = useNavigate();

  const { addRecipe, hasLoaded, fetchingDishes, loadError } =
    useRecipeStore();

  function saveNewDish(recipeDraft: Omit<Recipe, "id" | "isUserRecipe">) {
    const newRecipeId = addRecipe(recipeDraft);

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

      <RecipeForm
        onSave={saveNewDish}
        buttonText="Add Recipe"
      />
    </section>
  );
}

export default AddRecipe;
