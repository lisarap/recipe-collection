
import { Link, useNavigate } from "react-router-dom";
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
      <nav className="navbar" aria-label="Main navigation">
        <Link to="/" className="logo">
          MyDish
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/recipes">Recipes</Link>
          <Link to="/addRecipe">Add Recipe</Link>

          {currentUser ? (
            <>
              <span className="nav-user">Hi, {currentUser}</span>
              <button
                type="button"
                className="logout-btn"
                onClick={leaveAccount}
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
