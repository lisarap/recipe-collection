
import { useEffect, useState } from "react";
import type { Recipe } from "../types/Recipe";
import { getRecipes } from "../services/recipeService";
import RecipeCard from "../components/RecipeCard";

function Recipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

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

  const categories = [
    "All",
    ...new Set(recipes.map((recipe) => recipe.category))
  ];

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch = recipe.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || recipe.category === category;

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return <p role="status">Loading recipes...</p>;
  }

  if (error) {
    return <p role="alert">{error}</p>;
  }

  return (
    <section className="recipes-page">
      <h1>Explore Recipes</h1>
      <p>Find something delicious to make today.</p>

      <div className="recipe-filters">
        <div className="filter-group">
          <label htmlFor="recipe-search">Search recipes</label>
          <input
            id="recipe-search"
            type="search"
            placeholder="Search for a recipe..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label htmlFor="recipe-category">Category</label>
          <select
            id="recipe-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredRecipes.length === 0 ? (
        <p>
          {recipes.length === 0
            ? "No recipes available yet."
            : "No recipes match your search."}
        </p>
      ) : (
        <div className="recipe-grid">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </section>
  );
}

export default Recipes;
