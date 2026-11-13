
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useSavedRecipesStore } from "../store/useSavedRecipesStore";
import AuthPrompt from "./AuthPrompt";

type SaveButtonProps = {
  recipeId: number;
  recipeName: string;
  onDetails?: boolean;
};

function SaveButton({
  recipeId,
  recipeName,
  onDetails = false
}: SaveButtonProps) {
  const location = useLocation();

  const currentUser = useAuthStore((state) => state.currentUser);
  const savedByUser = useSavedRecipesStore((state) => state.savedByUser);
  const toggleSaved = useSavedRecipesStore((state) => state.toggleSaved);

  const [showPrompt, setShowPrompt] = useState(false);

  const savedIds = currentUser
    ? savedByUser[currentUser] ?? []
    : [];

  const isSaved = savedIds.includes(recipeId);

  function savePickedDish() {
    if (!currentUser) {
      setShowPrompt(true);
      return;
    }

    toggleSaved(currentUser, recipeId);
  }

  return (
    <>
      <button
        type="button"
        className={`bookmark-btn ${isSaved ? "bookmarked" : ""} ${onDetails ? "bookmark-details" : ""}`}
        onClick={savePickedDish}
        aria-label={`${isSaved ? "Unsave" : "Save"} ${recipeName}`}
        aria-pressed={isSaved}
        title={isSaved ? "Remove from saved" : "Save recipe"}
      >
        <svg
          width="23"
          height="23"
          viewBox="0 0 24 24"
          fill={isSaved ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M6 3h12v18l-6-4-6 4V3z" />
        </svg>
      </button>

      <AuthPrompt
        isOpen={showPrompt}
        promptType="save"
        returnTo={location.pathname + location.search}
        onClose={() => setShowPrompt(false)}
      />
    </>
  );
}

export default SaveButton;
