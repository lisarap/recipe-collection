
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const promptMessages = {
  save: {
    title: "Save your favourite recipes!",
    message:
      "Want to keep this recipe for later? Sign in or create an account to save your favourite dishes and access them anytime."
  },
  myRecipes: {
    title: "Your kitchen starts here!",
    message:
      "Sign in or create an account to add, manage, and share your own delicious recipes."
  },
  savedRecipes: {
    title: "Your favourites, all in one place!",
    message:
      "Sign in or create an account to save the recipes you love and find them whenever you need them."
  }
};

type AuthPromptProps = {
  isOpen: boolean;
  promptType: keyof typeof promptMessages;
  returnTo: string;
  onClose: () => void;
};

function AuthPrompt({
  isOpen,
  promptType,
  returnTo,
  onClose
}: AuthPromptProps) {
  const navigate = useNavigate();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const signInRef = useRef<HTMLButtonElement>(null);

  const promptText = promptMessages[promptType];

  useEffect(() => {
    const popup = dialogRef.current;

    if (!popup) return;

    if (isOpen && !popup.open) {
      popup.showModal();
      signInRef.current?.focus();
    } else if (!isOpen && popup.open) {
      popup.close();
    }
  }, [isOpen]);

  function closePopup() {
    dialogRef.current?.close();
  }

  function openAccountPage(page: string) {
    closePopup();

    navigate(page, {
      state: { from: returnTo }
    });
  }

  return (
    <dialog
      ref={dialogRef}
      className="auth-dialog"
      aria-labelledby="auth-dialog-title"
      aria-describedby="auth-dialog-description"
      onClose={onClose}
    >
      <button
        type="button"
        className="auth-dialog-close"
        onClick={closePopup}
        aria-label="Close popup"
      >
        ×
      </button>

      <div className="auth-dialog-icon" aria-hidden="true">
        ♡
      </div>

      <h2 id="auth-dialog-title">
        {promptText.title}
      </h2>

      <p id="auth-dialog-description">
        {promptText.message}
      </p>

      <div className="auth-dialog-actions">
        <button
          ref={signInRef}
          type="button"
          className="auth-signin-btn"
          onClick={() => openAccountPage("/login")}
        >
          Sign In
        </button>

        <button
          type="button"
          className="auth-register-btn"
          onClick={() => openAccountPage("/register")}
        >
          Create Account
        </button>

        <button
          type="button"
          className="auth-later-btn"
          onClick={closePopup}
        >
          Not Now
        </button>
      </div>
    </dialog>
  );
}

export default AuthPrompt;
