
import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import RecipeDetails from "./pages/RecipeDetails";
import MyRecipes from "./pages/MyRecipes";
import SavedRecipes from "./pages/SavedRecipes";
import AddRecipe from "./pages/AddRecipe";
import EditRecipe from "./pages/EditRecipe";
import Login from "./pages/Login";
import Register from "./pages/Register";

import { useRecipeStore } from "./store/useRecipeStore";

function App() {
  const location = useLocation();
  const loadRecipes = useRecipeStore((state) => state.loadRecipes);

  useEffect(() => {
    loadRecipes();
  }, [loadRecipes]);

  const isHomePage = location.pathname === "/";

  return (
    <>
      <Navbar />

      <main
        className={
          isHomePage
            ? "main-content home-content"
            : "main-content"
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route
            path="/recipes/:recipeId"
            element={<RecipeDetails />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/myRecipes" element={<MyRecipes />} />
            <Route path="/savedRecipes" element={<SavedRecipes />} />
            <Route path="/addRecipe" element={<AddRecipe />} />
            <Route
              path="/editRecipe/:recipeId"
              element={<EditRecipe />}
            />
          </Route>

          <Route
            path="*"
            element={
              <section>
                <h1>Page not found</h1>
                <p>Sorry, we couldn't find that page.</p>
              </section>
            }
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
