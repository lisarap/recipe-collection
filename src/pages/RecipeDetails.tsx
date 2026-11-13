
import { useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useParams
} from "react-router-dom";
import { useRecipeStore } from "../store/useRecipeStore";
import { useAuthStore } from "../store/useAuthStore";
import { useSavedRecipesStore } from "../store/useSavedRecipesStore";

function RecipeDetails() {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const currentUser = useAuthStore((state) => state.currentUser);

  const {
    recipesList,
    fetchingDishes,
    hasLoaded,
    loadError,
    deleteRecipe
  } = useRecipeStore();

  const forgetRecipe = useSavedRecipesStore(
    (state) => state.forgetRecipe
  );

  const [deleteError, setDeleteError] = useState("");

  const pickedDish = recipesList.find(
    (dish) => dish.id === Number(recipeId)
  );

  const canManageRecipe =
    currentUser !== null &&
    pickedDish?.isUserRecipe === true &&
    pickedDish.ownerId === currentUser;

  function removePickedDish() {
    if (!pickedDish || !canManageRecipe) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete "${pickedDish.name}"?`
    );

    if (!confirmed) return;

    const removed = deleteRecipe(pickedDish.id);

    if (removed) {
      forgetRecipe(pickedDish.id);

      navigate("/myRecipes", {
        state: {
          notice: `"${pickedDish.name}" was deleted successfully.`
        }
      });
    } else {
      setDeleteError("Couldn't delete this recipe.");
    }
  }

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
    pickedDish.isUserRecipe === true &&
    pickedDish.isPublished !== true &&
    !canManageRecipe
  ) {
    return (
      <section>
        <h1>Recipe unavailable</h1>
        <p>This recipe is private.</p>
        <Link to="/recipes">Back to Recipes</Link>
      </section>
    );
  }


  return (
    <section className="recipe-details">
      <Link
        to={canManageRecipe ? "/myRecipes" : "/recipes"}
        className="back-link"
      >
        Back to Recipes
      </Link>

      {location.state?.notice && (
        <p className="status-message" role="status">
          {location.state.notice}
        </p>
      )}

      <h1>{pickedDish.name}</h1>
      <p>{pickedDish.description}</p>

      {pickedDish.image && (
        <img
          src={
            pickedDish.image.startsWith("data:")
              ? pickedDish.image
              : `${import.meta.env.BASE_URL}${pickedDish.image}`
          }
          alt={pickedDish.name}
          className="details-image"
        />
      )}

      <p>Category: {pickedDish.category}</p>
      <p>Cooking time: {pickedDish.cookingTime} minutes</p>

      <h2>Ingredients</h2>
      <ul>
        {pickedDish.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>

      <h2>Instructions</h2>
      <ol>
        {pickedDish.instructions.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>

      {canManageRecipe && (
        <div className="recipe-actions">
          <Link
            to={`/editRecipe/${pickedDish.id}`}
            className="edit-recipe-btn"
          >
            Edit Recipe
          </Link>

          <button
            type="button"
            className="delete-recipe-btn"
            onClick={removePickedDish}
          >
            Delete Recipe
          </button>
        </div>
      )}

      {deleteError && (
        <p role="alert">{deleteError}</p>
      )}
    </section>
  );
}

export default RecipeDetails;
