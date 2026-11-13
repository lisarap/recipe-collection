
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import { useAuthStore } from "../store/useAuthStore";
import { useRecipeStore } from "../store/useRecipeStore";
import { useSavedRecipesStore } from "../store/useSavedRecipesStore";

function MyRecipes() {
  const location = useLocation();
  const currentUser = useAuthStore((state) => state.currentUser);

  const {
    recipesList,
    fetchingDishes,
    hasLoaded,
    loadError,
    loadRecipes,
    editRecipe,
    deleteRecipe,
    publishRecipe
  } = useRecipeStore();

  const forgetRecipe = useSavedRecipesStore(
    (state) => state.forgetRecipe
  );

  const [actionNotice, setActionNotice] = useState("");
  const [actionError, setActionError] = useState("");

  const myDishes = recipesList.filter(
    (dish) =>
      dish.isUserRecipe === true &&
      dish.ownerId === currentUser
  );

  function publishMyDish(recipeId: number) {
    const published = publishRecipe(recipeId);

    if (published) {
      setActionError("");
      setActionNotice("Your recipe is now published!");
    } else {
      setActionNotice("");
      setActionError("Couldn't publish this recipe.");
    }
  }

  function removeMyDish(recipeId: number, recipeName: string) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${recipeName}"?`
    );

    if (!confirmed) return;

    const removed = deleteRecipe(recipeId);

    if (removed) {
      forgetRecipe(recipeId);
      setActionError("");
      setActionNotice(`"${recipeName}" was deleted successfully.`);
    } else {
      setActionNotice("");
      setActionError("Couldn't delete this recipe.");
    }
  }

  if (loadError) {
    return (
      <section>
        <p role="alert">{loadError}</p>
        <button type="button" onClick={loadRecipes}>
          Try again
        </button>
      </section>
    );
  }

  if (!hasLoaded || fetchingDishes) {
    return <p role="status">Loading your recipes...</p>;
  }

  return (
    <section className="recipes-page">
      <div className="my-recipes-header">
        <div>
          <h1>My Recipes</h1>
          <p>Recipes you've added to Good Food.</p>
        </div>

        <Link to="/addRecipe" className="browse-btn">
          Add New Recipe
        </Link>
      </div>

      {(actionNotice || location.state?.notice) && (
        <p className="status-message" role="status">
          {actionNotice || location.state?.notice}
        </p>
      )}

      {actionError && (
        <p className="field-error" role="alert">
          {actionError}
        </p>
      )}

      {myDishes.length === 0 ? (
        <div className="empty-recipes">
          <h2>No recipes added yet</h2>
          <p>Start by sharing one of your favourite dishes.</p>
        </div>
      ) : (
        <div className="recipe-grid">
          {myDishes.map((dish) => (
            <div className="my-recipe-item" key={dish.id}>
              <RecipeCard recipe={dish} />

              <p className="recipe-visibility">
                {dish.isPublished === true
                  ? "Published"
                  : "Private"}
              </p>

              <div className="recipe-actions">
                <Link
                  to={`/editRecipe/${dish.id}`}
                  className="edit-recipe-btn"
                >
                  Edit
                </Link>

                <button
                  type="button"
                  className="delete-recipe-btn"
                  onClick={() => removeMyDish(dish.id, dish.name)}
                >
                  Delete
                </button>

                {dish.isPublished !== true && (
                  <button
                    type="button"
                    className="publish-recipe-btn"
                    onClick={() => publishMyDish(dish.id)}
                  >
                    Publish
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default MyRecipes;
