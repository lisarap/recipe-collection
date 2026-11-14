
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import AuthPrompt from "./AuthPrompt";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const { currentUser, signOut } = useAuthStore();

  const [kitchenOpen, setKitchenOpen] = useState(false);
  const [promptPage, setPromptPage] = useState<
    "myRecipes" | "savedRecipes" | null
  >(null);

  const kitchenRef = useRef<HTMLDivElement>(null);
  const kitchenButton = useRef<HTMLButtonElement>(null);

  const kitchenActive =
    location.pathname === "/myRecipes" ||
    location.pathname === "/savedRecipes";

  useEffect(() => {
    if (!kitchenOpen) return;

    function closeOutside(event: PointerEvent) {
      if (
        kitchenRef.current &&
        !kitchenRef.current.contains(event.target as Node)
      ) {
        setKitchenOpen(false);
      }
    }

    document.addEventListener("pointerdown", closeOutside);

    return () => {
      document.removeEventListener("pointerdown", closeOutside);
    };
  }, [kitchenOpen]);

  function checkGuestAccess(
    event: MouseEvent<HTMLAnchorElement>,
    page: "myRecipes" | "savedRecipes"
  ) {
    setKitchenOpen(false);

    if (!currentUser) {
      event.preventDefault();
      setPromptPage(page);
    }
  }

  function leaveAccount() {
    setKitchenOpen(false);
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

          <div
            className="kitchen-menu"
            ref={kitchenRef}
            onPointerEnter={(event) => {
              if (event.pointerType === "mouse") {
                setKitchenOpen(true);
              }
            }}
            onPointerLeave={(event) => {
              if (event.pointerType === "mouse") {
                setKitchenOpen(false);
              }
            }}
            onBlur={(event) => {
              if (
                !event.currentTarget.contains(
                  event.relatedTarget as Node | null
                )
              ) {
                setKitchenOpen(false);
              }
            }}
            onKeyDown={(event) => {
              if (event.key === "Escape" && kitchenOpen) {
                event.preventDefault();
                setKitchenOpen(false);
                kitchenButton.current?.focus();
              }
            }}
          >
            <button
              ref={kitchenButton}
              type="button"
              className={`kitchen-toggle ${kitchenActive ? "kitchen-active" : ""}`}
              aria-expanded={kitchenOpen}
              aria-controls="kitchen-dropdown"
              onClick={() => setKitchenOpen((open) => !open)}
            >
              Kitchen
              <span className="kitchen-arrow-icon" aria-hidden="true">
                ▾
              </span>
            </button>

            {kitchenOpen && (
              <div className="kitchen-dropdown" id="kitchen-dropdown">
                <NavLink
                  to="/myRecipes"
                  onClick={(event) =>
                    checkGuestAccess(event, "myRecipes")
                  }
                >
                  My Recipes
                </NavLink>

                <NavLink
                  to="/savedRecipes"
                  onClick={(event) =>
                    checkGuestAccess(event, "savedRecipes")
                  }
                >
                  Saved Recipes
                </NavLink>
              </div>
            )}
          </div>

          <NavLink to="/recipes">
            All Recipes
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
