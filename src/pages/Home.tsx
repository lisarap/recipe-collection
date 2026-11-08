import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="hero">
      <h1>Welcome to MyDish</h1>

      <p>
        Discover delicious recipes and find something new to cook.
      </p>

      <Link to="/recipes" className="browse-btn">
        Explore Recipes
      </Link>
    </section>
  );
}

export default Home;