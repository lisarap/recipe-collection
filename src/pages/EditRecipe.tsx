
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import RecipeForm from "../components/RecipeForm";
import { useRecipeStore } from "../store/useRecipeStore";
import type { RecipeInput } from "../types/Recipe";
import { useAuthStore } from "../store/useAuthStore";

function EditRecipe() {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const currentUser = useAuthStore((state) => state.currentUser);

  const {
    recipesList,
    editRecipe,
    hasLoaded,
    fetchingDishes,
    loadError
  } = useRecipeStore();

  const [saveError, setSaveError] = useState("");

  const pickedDish = recipesList.find(
    (dish) => dish.id === Number(recipeId)
  );

  if (loadError) {
    return <p role="alert">{loadError}</p>;
  }

  if (!hasLoaded || fetchingDishes) {
    return <p role="status">Loading recipe...</p>;
  }

  if (!pickedDish) {
    return (
      <section>
        <h1>Recipe not found</h1>
        <Link to="/recipes">Back to Recipes</Link>
      </section>
    );
  }

    if (
        pickedDish.isUserRecipe !== true ||
        pickedDish.ownerId !== currentUser
    ) {
    return (
      <section>
        <h1>Recipe cannot be edited</h1>
        <p>Original MyDish recipes cannot be changed.</p>
        <Link to={`/recipes/${pickedDish.id}`}>
          Back to Recipe
        </Link>
      </section>
    );
  }

  function saveEditedDish(recipeDraft: RecipeInput) {
    const saved = editRecipe(Number(recipeId), recipeDraft);

    if (saved) {
      navigate(`/recipes/${recipeId}`, {
        state: { notice: "Recipe updated successfully." }
      });
    } else {
      setSaveError("Couldn't save your changes.");
    }
  }

  return (
    <section className="add-recipe-page">
      <h1>Edit Recipe</h1>
      <p>Make changes to your recipe below.</p>

      {saveError && <p role="alert">{saveError}</p>}

      <RecipeForm
        key={pickedDish.id}
        startingDish={pickedDish}
        onSave={saveEditedDish}
        buttonText="Save Changes"
      />
    </section>
  );
}

export default EditRecipe;
