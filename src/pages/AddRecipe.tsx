
import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useRecipeStore } from "../store/useRecipeStore";

type RecipeFormErrors = {
  name?: string;
  cookingTime?: string;
  description?: string;
  ingredients?: string;
  instructions?: string;
  photo?: string;
};

function AddRecipe() {
  const navigate = useNavigate();
  const { addRecipe, hasLoaded, fetchingDishes, loadError } =
    useRecipeStore();

  const [recipeDraft, setRecipeDraft] = useState({
    name: "",
    category: "Dinner",
    cookingTime: "",
    description: "",
    ingredients: "",
    instructions: ""
  });

  const [dishPhotoPreview, setDishPhotoPreview] = useState("");
  const [fieldErrors, setFieldErrors] = useState<RecipeFormErrors>({});

  function pickDishPhoto(event: ChangeEvent<HTMLInputElement>) {
    const chosenFile = event.target.files?.[0];

    if (!chosenFile) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(chosenFile.type)) {
      setFieldErrors((current) => ({
        ...current,
        photo: "Please choose a JPG, PNG or WebP image."
      }));
      setDishPhotoPreview("");
      return;
    }

    if (chosenFile.size > 2 * 1024 * 1024) {
      setFieldErrors((current) => ({
        ...current,
        photo: "The image must be smaller than 2 MB."
      }));
      setDishPhotoPreview("");
      return;
    }

    const photoReader = new FileReader();

    photoReader.onload = () => {
      if (typeof photoReader.result === "string") {
        setDishPhotoPreview(photoReader.result);
        setFieldErrors((current) => ({ ...current, photo: "" }));
      }
    };

    photoReader.onerror = () => {
      setFieldErrors((current) => ({
        ...current,
        photo: "Couldn't read the selected image."
      }));
    };

    photoReader.readAsDataURL(chosenFile);
  }

  function saveDish(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!hasLoaded) return;

    const errors: RecipeFormErrors = {};

    const ingredientList = recipeDraft.ingredients
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

    const cookingSteps = recipeDraft.instructions
      .split("\n")
      .map((step) => step.trim())
      .filter(Boolean);

    const cookingMinutes = Number(recipeDraft.cookingTime);

    if (recipeDraft.name.trim().length < 3) {
      errors.name = "Recipe name must have at least 3 characters.";
    }

    if (!Number.isInteger(cookingMinutes) || cookingMinutes < 1) {
      errors.cookingTime = "Enter a valid cooking time.";
    }

    if (recipeDraft.description.trim().length < 10) {
      errors.description = "Description must have at least 10 characters.";
    }

    if (ingredientList.length === 0) {
      errors.ingredients = "Add at least one ingredient.";
    }

    if (cookingSteps.length === 0) {
      errors.instructions = "Add at least one cooking step.";
    }

    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) return;

    const newRecipeId = addRecipe({
      name: recipeDraft.name.trim(),
      category: recipeDraft.category,
      cookingTime: cookingMinutes,
      description: recipeDraft.description.trim(),
      ingredients: ingredientList,
      instructions: cookingSteps,
      image: dishPhotoPreview || undefined
    });

    navigate(`/recipes/${newRecipeId}`);
  }

  if (loadError) {
    return <p role="alert">{loadError}</p>;
  }

  if (fetchingDishes || !hasLoaded) {
    return <p role="status">Loading recipes...</p>;
  }

  return (
    <section className="add-recipe-page">
      <h1>Add a New Recipe</h1>
      <p>Share one of your favourite recipes.</p>

      <form onSubmit={saveDish} className="recipe-form" noValidate>
        <div className="form-group">
          <label htmlFor="dishName">Recipe Name</label>
          <input
            id="dishName"
            type="text"
            value={recipeDraft.name}
            onChange={(e) =>
              setRecipeDraft({ ...recipeDraft, name: e.target.value })
            }
            aria-invalid={Boolean(fieldErrors.name)}
          />
          {fieldErrors.name && <p className="field-error">{fieldErrors.name}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="dishCategory">Category</label>
          <select
            id="dishCategory"
            value={recipeDraft.category}
            onChange={(e) =>
              setRecipeDraft({ ...recipeDraft, category: e.target.value })
            }
          >
            <option>Breakfast</option>
            <option>Lunch</option>
            <option>Dinner</option>
            <option>Snack</option>
            <option>Dessert</option>
            <option>Drinks</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="dishTime">Cooking Time (minutes)</label>
          <input
            id="dishTime"
            type="number"
            min="1"
            step="1"
            value={recipeDraft.cookingTime}
            onChange={(e) =>
              setRecipeDraft({ ...recipeDraft, cookingTime: e.target.value })
            }
            aria-invalid={Boolean(fieldErrors.cookingTime)}
          />
          {fieldErrors.cookingTime && (
            <p className="field-error">{fieldErrors.cookingTime}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="dishDescription">Description</label>
          <textarea
            id="dishDescription"
            rows={3}
            value={recipeDraft.description}
            onChange={(e) =>
              setRecipeDraft({ ...recipeDraft, description: e.target.value })
            }
            aria-invalid={Boolean(fieldErrors.description)}
          />
          {fieldErrors.description && (
            <p className="field-error">{fieldErrors.description}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="dishIngredients">Ingredients</label>
          <textarea
            id="dishIngredients"
            rows={5}
            placeholder="Enter each ingredient on a new line"
            value={recipeDraft.ingredients}
            onChange={(e) =>
              setRecipeDraft({ ...recipeDraft, ingredients: e.target.value })
            }
            aria-invalid={Boolean(fieldErrors.ingredients)}
          />
          {fieldErrors.ingredients && (
            <p className="field-error">{fieldErrors.ingredients}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="dishSteps">Instructions</label>
          <textarea
            id="dishSteps"
            rows={5}
            placeholder="Enter each step on a new line"
            value={recipeDraft.instructions}
            onChange={(e) =>
              setRecipeDraft({ ...recipeDraft, instructions: e.target.value })
            }
            aria-invalid={Boolean(fieldErrors.instructions)}
          />
          {fieldErrors.instructions && (
            <p className="field-error">{fieldErrors.instructions}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="dishPhoto">Recipe Photo (Optional)</label>
          <input
            id="dishPhoto"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={pickDishPhoto}
          />
          <small>JPG, PNG or WebP. Maximum 2 MB.</small>

          {fieldErrors.photo && (
            <p className="field-error">{fieldErrors.photo}</p>
          )}

          {dishPhotoPreview && (
            <div>
              <img
                src={dishPhotoPreview}
                alt="Selected recipe preview"
                className="photo-preview"
              />
              <button
                type="button"
                className="remove-photo"
                onClick={() => setDishPhotoPreview("")}
              >
                Remove photo
              </button>
            </div>
          )}
        </div>

        <p className="form-note">
          New recipes are temporary and will be lost when you refresh the page.
        </p>

        <button type="submit" className="save-recipe-btn">
          Save Recipe
        </button>
      </form>
    </section>
  );
}

export default AddRecipe;
