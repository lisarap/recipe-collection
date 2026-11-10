
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { Recipe } from "../types/Recipe";
import { getRecipes } from "../services/recipeService";

function RecipeDetails() {
  const { recipeId } = useParams();
  const [chosenDish, setChosenDish] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    async function loadDishDetails() {
      setIsLoading(true);
      setLoadError("");

      try {
        const dishCollection = await getRecipes();
        const matchingDish = dishCollection.find(
          (dish) => dish.id === Number(recipeId)
        );

        setChosenDish(matchingDish ?? null);
      } catch {
        setLoadError("Couldn't load this recipe.");
      } finally {
        setIsLoading(false);
      }
    }

    loadDishDetails();
  }, [recipeId]);

  if (isLoading) {
    return <p role="status">Loading recipe...</p>;
  }

  if (loadError) {
    return <p role="alert">{loadError}</p>;
  }

  if (!chosenDish) {
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

      <h1>{chosenDish.name}</h1>
      <p>{chosenDish.description}</p>

      {chosenDish.image && (
        <img
          src={`${import.meta.env.BASE_URL}${chosenDish.image}`}
          alt={chosenDish.name}
          className="details-image"
        />
      )}

      <p>Category: {chosenDish.category}</p>
      <p>Cooking time: {chosenDish.cookingTime} minutes</p>

      <h2>Ingredients</h2>
      <ul>
        {chosenDish.ingredients.map((ingredient, ingredientIndex) => (
          <li key={ingredientIndex}>{ingredient}</li>
        ))}
      </ul>

      <h2>Instructions</h2>
      <ol>
        {chosenDish.instructions.map((step, stepIndex) => (
          <li key={stepIndex}>{step}</li>
        ))}
      </ol>
    </section>
  );
}

export default RecipeDetails;
