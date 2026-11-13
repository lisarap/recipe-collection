
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useSavedRecipesStore } from "../store/useSavedRecipesStore";

type SaveButtonProps = {
  recipeId: number;
  recipeName: string;
};

function SaveButton({ recipeId, recipeName }: SaveButtonProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const currentUser = useAuthStore((state) => state.currentUser);
  const savedByUser = useSavedRecipesStore((state) => state.savedByUser);
  const toggleSaved = useSavedRecipesStore((state) => state.toggleSaved);

  const savedIds = currentUser
    ? savedByUser[currentUser] ?? []
    : [];

  const isSaved = savedIds.includes(recipeId);

  function changeSavedStatus() {
    if (!currentUser) {
      navigate("/login", {
        state: { from: location.pathname }
      });
      return;
    }

    toggleSaved(currentUser, recipeId);
  }

  return (
    <button
      type="button"
      className={`bookmark-btn ${isSaved ? "bookmarked" : ""}`}
      onClick={changeSavedStatus}
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
  );
}

export default SaveButton;
