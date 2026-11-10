
import { Link } from "react-router-dom";
import type { Recipe } from "../types/Recipe";

type RecipeCardProps = {
  recipe: Recipe;
};

function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <article className="recipe-card">
      <Link to={`/recipes/${recipe.id}`} className="recipe-card-link">
        {recipe.image ? (
          <img
          src={
                recipe.image.startsWith("data:")
                    ? recipe.image
                    : `${import.meta.env.BASE_URL}${recipe.image}`
                }
            alt={recipe.name}
            className="recipe-image"
            loading="lazy"
          />
        ) : (
          <div className="recipe-image-placeholder" aria-hidden="true">
            🍽️
          </div>
        )}

        <div className="recipe-info">
          <span className="recipe-category">{recipe.category}</span>
          <h2>{recipe.name}</h2>
          <p>{recipe.description}</p>
          <p>Cooking time: {recipe.cookingTime} mins</p>
        </div>

        <div className="recipe-preview" aria-hidden="true">
          <h3>How to Make It</h3>
          <ol>
            {recipe.instructions.map((step, stepIndex) => (
              <li key={stepIndex}>{step}</li>
            ))}
          </ol>
          <p className="preview-hint">Click to view the full recipe</p>
        </div>
      </Link>
    </article>
  );
}

export default RecipeCard;
