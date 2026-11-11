
import { useState } from "react";
import RecipeCard from "../components/RecipeCard";
import { useRecipeStore } from "../store/useRecipeStore";
import { useLocation } from "react-router-dom";

function Recipes() {
  const { recipesList, fetchingDishes, loadError, loadRecipes } =
    useRecipeStore();
  const location = useLocation();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    ...new Set(recipesList.map((dish) => dish.category))
  ];

  const matchingDishes = recipesList.filter((dish) => {
    const matchesSearch = dish.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || dish.category === category;

    return matchesSearch && matchesCategory;
  });

  if (fetchingDishes) {
    return <p role="status">Loading recipes...</p>;
  }

  if (loadError) {
    return (
      <div>
        <p role="alert">{loadError}</p>
        <button onClick={loadRecipes}>Try again</button>
      </div>
    );
  }

  return (
    <section className="recipes-page">
      <h1>Explore Recipes</h1>
      <p>Find something delicious to make today.</p>
      {location.state?.notice && (
        <p className="status-message" role="status">
          {location.state.notice}
        </p>
      )}

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
            {categories.map((mealType) => (
              <option key={mealType} value={mealType}>
                {mealType}
              </option>
            ))}
          </select>
        </div>
      </div>

      {matchingDishes.length === 0 ? (
        <p>
          {recipesList.length === 0
            ? "No recipes available yet."
            : "No recipes match your search."}
        </p>
      ) : (
        <div className="recipe-grid">
          {matchingDishes.map((dish) => (
            <RecipeCard key={dish.id} recipe={dish} />
          ))}
        </div>
      )}
    </section>
  );
}

export default Recipes;
