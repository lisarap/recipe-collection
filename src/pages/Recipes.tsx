
import { useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import { useRecipeStore } from "../store/useRecipeStore";

function Recipes() {
  const {
    recipesList,
    fetchingDishes,
    hasLoaded,
    loadError,
    loadRecipes
  } = useRecipeStore();

  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");

  const category = searchParams.get("category") ?? "All";

  const publicDishes = recipesList.filter(
    (dish) =>
      dish.isUserRecipe !== true ||
      dish.isPublished === true
  );

  const categories = [
    "All",
    ...new Set(publicDishes.map((dish) => dish.category))
  ];

  const matchingDishes = publicDishes.filter((dish) => {
    const matchesSearch = dish.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || dish.category === category;

    return matchesSearch && matchesCategory;
  });

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
    return <p role="status">Loading recipes...</p>;
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
            onChange={(e) => {
              const pickedCategory = e.target.value;

              setSearchParams(
                pickedCategory === "All"
                  ? {}
                  : { category: pickedCategory }
              );
            }}
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
          {publicDishes.length === 0
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
