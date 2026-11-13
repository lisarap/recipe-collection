
import { useState, type MouseEvent } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import AuthPrompt from "./AuthPrompt";

function Navbar() {
  const navigate = useNavigate();
  const { currentUser, signOut } = useAuthStore();

  const [promptPage, setPromptPage] = useState<
    "myRecipes" | "savedRecipes" | null
  >(null);

  function checkGuestAccess(
    event: MouseEvent<HTMLAnchorElement>,
    page: "myRecipes" | "savedRecipes"
  ) {
    if (!currentUser) {
      event.preventDefault();
      setPromptPage(page);
    }
  }

  function leaveAccount() {
    signOut();
    navigate("/");
  }

  return (
    <header className="header">
      <nav className="navbar" aria-label="Good Food navigation">
        <div className="nav-links">
          <NavLink to="/" end>
            Home
          </NavLink>

          <NavLink
            to="/myRecipes"
            onClick={(event) => checkGuestAccess(event, "myRecipes")}
          >
            My Recipes
          </NavLink>

          <NavLink
            to="/savedRecipes"
            onClick={(event) => checkGuestAccess(event, "savedRecipes")}
          >
            Saved Recipes
          </NavLink>

          {currentUser ? (
            <>
              <span className="nav-user">
                Hi, {currentUser}
              </span>

              <button
                type="button"
                className="logout-btn"
                onClick={leaveAccount}
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink to="/login">
              Login
            </NavLink>
          )}
        </div>
      </nav>

      <AuthPrompt
        isOpen={promptPage !== null}
        promptType={promptPage ?? "myRecipes"}
        returnTo={
          promptPage === "savedRecipes"
            ? "/savedRecipes"
            : "/myRecipes"
        }
        onClose={() => setPromptPage(null)}
      />
    </header>
  );
}

export default Navbar;
