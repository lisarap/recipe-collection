import { useEffect, useState } from "react";
import type { Recipe } from "../types/Recipe";
import { getRecipes } from "../services/recipeService";

function Recipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadRecipes() {
      try {
        const data = await getRecipes();
        setRecipes(data);
      } catch {
        setError("Couldn't load recipes. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    loadRecipes();
  }, []);

  if (loading) {
    return <p>Loading recipes...</p>;
  }

  if (error) {
    return <p role="alert">{error}</p>;
  }

  return (
    <section className="recipes-page">
      <h1>Explore Recipes</h1>
      <p>Find something delicious to make today.</p>

      {recipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        <div className="recipe-grid">
          {recipes.map((recipe) => (
            <article className="recipe-card" key={recipe.id}>
              <h2>{recipe.name}</h2>
              <p>{recipe.description}</p>
              <p>Category: {recipe.category}</p>
              <p>Cooking time: {recipe.cookingTime} minutes</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default Recipes;