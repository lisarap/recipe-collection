
import { Link } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import { useAuthStore } from "../store/useAuthStore";
import { useRecipeStore } from "../store/useRecipeStore";
import { useSavedRecipesStore } from "../store/useSavedRecipesStore";

function SavedRecipes() {
  const currentUser = useAuthStore((state) => state.currentUser);

  const {
    recipesList,
    fetchingDishes,
    hasLoaded,
    loadError
  } = useRecipeStore();

  const savedByUser = useSavedRecipesStore((state) => state.savedByUser);

  const savedIds = currentUser
    ? savedByUser[currentUser] ?? []
    : [];

  const savedDishes = recipesList.filter(
    (dish) =>
        savedIds.includes(dish.id) &&
        (dish.isUserRecipe !== true || dish.isPublished === true)
    );

  if (!hasLoaded || fetchingDishes) {
    return <p role="status">Loading recipes...</p>;
  }

  if (loadError) {
    return <p role="alert">{loadError}</p>;
  }

  return (
    <section className="recipes-page">
      <h1>Saved Recipes</h1>
      <p>Your favourite recipes, all in one place.</p>

      {savedDishes.length === 0 ? (
        <div className="empty-recipes">
          <p>
            {savedIds.length > 0
              ? "Some saved recipes are no longer available."
              : "You haven't saved any recipes yet."}
          </p>

          <Link to="/recipes" className="browse-btn">
            Explore Recipes
          </Link>
        </div>
      ) : (
        <div className="recipe-grid">
          {savedDishes.map((dish) => (
            <RecipeCard key={dish.id} recipe={dish} />
          ))}
        </div>
      )}
    </section>
  );
}

export default SavedRecipes;
