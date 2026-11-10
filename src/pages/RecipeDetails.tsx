
import { Link, useParams } from "react-router-dom";
import { useRecipeStore } from "../store/useRecipeStore";

function RecipeDetails() {
  const { recipeId } = useParams();
  const { recipesList, fetchingDishes, loadError } = useRecipeStore();

  const pickedDish = recipesList.find(
    (dish) => dish.id === Number(recipeId)
  );

  if (fetchingDishes) {
    return <p role="status">Loading recipe...</p>;
  }

  if (loadError) {
    return <p role="alert">{loadError}</p>;
  }

  if (!pickedDish) {
    return (
      <section>
        <h1>Recipe not found</h1>
        <Link to="/recipes">Back to recipes</Link>
      </section>
    );
  }

  return (
    <section className="recipe-details">
      <Link to="/recipes" className="back-link">
        Back to Recipes
      </Link>

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
    </section>
  );
}

export default RecipeDetails;
