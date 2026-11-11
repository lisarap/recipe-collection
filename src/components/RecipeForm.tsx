
import { useState, type ChangeEvent, type FormEvent } from "react";
import type { Recipe, RecipeInput } from "../types/Recipe";

type RecipeFormProps = {
  startingDish?: Recipe;
  onSave: (recipeDraft: RecipeInput) => void;
  buttonText: string;
};

type FormErrors = {
  name?: string;
  cookingTime?: string;
  description?: string;
  ingredients?: string;
  instructions?: string;
  photo?: string;
};

function RecipeForm({ startingDish, onSave, buttonText }: RecipeFormProps) {
  const [recipeDraft, setRecipeDraft] = useState({
    name: startingDish?.name ?? "",
    category: startingDish?.category ?? "Dinner",
    cookingTime: startingDish ? String(startingDish.cookingTime) : "",
    description: startingDish?.description ?? "",
    ingredients: startingDish?.ingredients.join("\n") ?? "",
    instructions: startingDish?.instructions.join("\n") ?? ""
  });

  const [dishPhotoPreview, setDishPhotoPreview] = useState(
    startingDish?.image ?? ""
  );

  const [fieldErrors, setFieldErrors] = useState<FormErrors>({});
  const [readingPhoto, setReadingPhoto] = useState(false);

  function changeDraft(field: keyof typeof recipeDraft, value: string) {
    setRecipeDraft((current) => ({
      ...current,
      [field]: value
    }));

    setFieldErrors((current) => ({
      ...current,
      [field]: undefined
    }));
  }

  function pickDishPhoto(event: ChangeEvent<HTMLInputElement>) {
    const pickedFile = event.target.files?.[0];

    if (!pickedFile) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(pickedFile.type)) {
      setFieldErrors((current) => ({
        ...current,
        photo: "Please choose a JPG, PNG or WebP image."
      }));
      event.target.value = "";
      return;
    }

    if (pickedFile.size > 2 * 1024 * 1024) {
      setFieldErrors((current) => ({
        ...current,
        photo: "The image must be smaller than 2 MB."
      }));
      event.target.value = "";
      return;
    }

    setReadingPhoto(true);
    setFieldErrors((current) => ({ ...current, photo: undefined }));

    const photoReader = new FileReader();

    photoReader.onload = () => {
      if (typeof photoReader.result === "string") {
        setDishPhotoPreview(photoReader.result);
      } else {
        setFieldErrors((current) => ({
          ...current,
          photo: "Couldn't read the selected image."
        }));
      }

      setReadingPhoto(false);
    };

    photoReader.onerror = () => {
      setFieldErrors((current) => ({
        ...current,
        photo: "Couldn't read the selected image."
      }));
      setReadingPhoto(false);
    };

    photoReader.readAsDataURL(pickedFile);
    event.target.value = "";
  }

  function saveDish(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (readingPhoto || fieldErrors.photo) return;

    const errors: FormErrors = {};

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

    onSave({
      name: recipeDraft.name.trim(),
      category: recipeDraft.category,
      cookingTime: cookingMinutes,
      description: recipeDraft.description.trim(),
      ingredients: ingredientList,
      instructions: cookingSteps,
      image: dishPhotoPreview || undefined,
    });
  }

  return (
    <form className="recipe-form" onSubmit={saveDish} noValidate>
      <div className="form-group">
        <label htmlFor="dishName">Recipe Name</label>
        <input
          id="dishName"
          type="text"
          value={recipeDraft.name}
          onChange={(e) => changeDraft("name", e.target.value)}
          aria-invalid={Boolean(fieldErrors.name)}
        />
        {fieldErrors.name && (
          <p className="field-error" role="alert">{fieldErrors.name}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="dishCategory">Category</label>
        <select
          id="dishCategory"
          value={recipeDraft.category}
          onChange={(e) => changeDraft("category", e.target.value)}
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
          onChange={(e) => changeDraft("cookingTime", e.target.value)}
          aria-invalid={Boolean(fieldErrors.cookingTime)}
        />
        {fieldErrors.cookingTime && (
          <p className="field-error" role="alert">
            {fieldErrors.cookingTime}
          </p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="dishDescription">Description</label>
        <textarea
          id="dishDescription"
          rows={3}
          value={recipeDraft.description}
          onChange={(e) => changeDraft("description", e.target.value)}
          aria-invalid={Boolean(fieldErrors.description)}
        />
        {fieldErrors.description && (
          <p className="field-error" role="alert">
            {fieldErrors.description}
          </p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="dishIngredients">Ingredients</label>
        <textarea
          id="dishIngredients"
          rows={5}
          placeholder="Enter one ingredient per line"
          value={recipeDraft.ingredients}
          onChange={(e) => changeDraft("ingredients", e.target.value)}
          aria-invalid={Boolean(fieldErrors.ingredients)}
        />
        {fieldErrors.ingredients && (
          <p className="field-error" role="alert">
            {fieldErrors.ingredients}
          </p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="dishSteps">Instructions</label>
        <textarea
          id="dishSteps"
          rows={5}
          placeholder="Enter one step per line"
          value={recipeDraft.instructions}
          onChange={(e) => changeDraft("instructions", e.target.value)}
          aria-invalid={Boolean(fieldErrors.instructions)}
        />
        {fieldErrors.instructions && (
          <p className="field-error" role="alert">
            {fieldErrors.instructions}
          </p>
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
        <div>
            <p className="field-error" role="alert">
            {fieldErrors.photo}
            </p>
            <button
            type="button"
            onClick={() =>
                setFieldErrors((current) => ({
                ...current,
                photo: undefined
                }))
            }
            >
            Continue without changing photo
            </button>
        </div>
        )}

        {dishPhotoPreview && (
          <div>
            <img
              src={
                dishPhotoPreview.startsWith("data:")
                  ? dishPhotoPreview
                  : `${import.meta.env.BASE_URL}${dishPhotoPreview}`
              }
              alt="Recipe photo preview"
              className="photo-preview"
            />

            <button
              type="button"
              className="remove-photo"
              onClick={() => setDishPhotoPreview("")}
              disabled={readingPhoto}
            >
              Remove photo
            </button>
          </div>
        )}
      </div>

      <p className="form-note">
        Recipe changes are temporary and reset when the page refreshes.
      </p>

      <button
        type="submit"
        className="save-recipe-btn"
        disabled={readingPhoto || Boolean(fieldErrors.photo)}
      >
        {readingPhoto ? "Loading photo..." : buttonText}
      </button>
    </form>
  );
}

export default RecipeForm;
