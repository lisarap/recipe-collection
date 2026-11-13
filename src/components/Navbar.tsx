
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

function Navbar() {
  const navigate = useNavigate();
  const { currentUser, signOut } = useAuthStore();

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

          <NavLink to="/myRecipes">
            My Recipes
          </NavLink>

          <NavLink to="/savedRecipes">
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
    </header>
  );
}

export default Navbar;
