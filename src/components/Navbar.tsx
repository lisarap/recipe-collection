import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="header">
      <nav className="navbar" aria-label="Main navigation">
        <Link to="/" className="logo">
          MyDish
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/recipes">Recipes</Link>
          <Link to="/login">Login</Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;