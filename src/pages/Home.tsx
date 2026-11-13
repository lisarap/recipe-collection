
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const homeImages = `${import.meta.env.BASE_URL}images/home/`;

const foodCategories = [
  { name: "Breakfast", image: "categoryBreakfast.png" },
  { name: "Lunch", image: "categoryLunch.png" },
  { name: "Dinner", image: "categoryDinner.png" },
  { name: "Snack", image: "categorySnack.png" }
];

function Home() {
  const currentUser = useAuthStore((state) => state.currentUser);

  return (
    <div className="goodfood-home">
      <section
        className="home-hero"
        style={{
          backgroundImage: `url("${homeImages}goodfoodHero.png")`
        }}
      >
        <h1 className="visually-hidden">Good Food</h1>

        <img
          src={`${homeImages}goodfoodLogo.png`}
          alt="Good Food - Find your next dish"
          className="home-hero-logo"
        />

        <Link
          to={currentUser ? "/myRecipes" : "/login"}
          className="hero-signin"
        >
          {currentUser ? "MY RECIPES" : "SIGN IN"}
        </Link>
      </section>

      <section className="flavors-section">
        <div className="flavors-photos">
          <img
            src={`${homeImages}featureBreakfast.png`}
            alt="Breakfast with eggs and strawberries"
          />
          <img
            src={`${homeImages}featureSushi.png`}
            alt="Sushi rolls"
          />
          <img
            src={`${homeImages}featureBrownies.png`}
            alt="Chocolate brownies"
          />
        </div>

        <div className="flavors-label">
          <h2>EXPLORE THE FLAVORS OF 2026</h2>
          <Link to="/recipes" className="flavors-button">
            Explore
          </Link>
        </div>
      </section>

      <section className="share-section">
        <div className="share-content">
          <div className="share-text">
            <h2>Share your favourite recipes!</h2>

            <p>
              Got a recipe you love? Share your favourite dishes
              with our community, inspire others to try something
              new, and spread the joy of cooking!
            </p>

            <Link
              to={currentUser ? "/myRecipes" : "/login"}
              className="share-button"
            >
              {currentUser ? "Share a recipe" : "Sign in to continue"}
            </Link>
          </div>

          <img
            src={`${homeImages}cookingTogether.png`}
            alt="Friends preparing food together"
            className="share-photo"
            loading="lazy"
          />
        </div>
      </section>

      <section className="category-section">
        <div className="category-inner">
          <h2>Explore by Category</h2>

          <p>
            Explore recipes for every craving, from quick breakfasts
            to delicious dinners and sweet treats. Find the perfect
            dish for any occasion, all in one place.
          </p>

          <div className="category-grid">
            {foodCategories.map((mealType) => (
              <Link
                to={`/recipes?category=${mealType.name}`}
                className="category-tile"
                key={mealType.name}
              >
                <img
                  src={`${homeImages}${mealType.image}`}
                  alt={`${mealType.name} recipes`}
                  loading="lazy"
                />

                <span>{mealType.name.toUpperCase()}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="closing-section">
        <h2>A LITTLE TASTE OF EVERYTHING.</h2>

        <p>
          EXPLORE, EXPERIMENT, AND MAKE EVERY MEAL YOUR OWN.
          THERE'S ALWAYS SOMETHING DELICIOUS WAITING TO BE DISCOVERED.
        </p>

        <img
          src={`${homeImages}goodfoodLogoMark.svg`}
          alt="Good Food"
          className="closing-logo"
          loading="lazy"
        />
      </section>

      <footer className="home-footer">
        <p>Good Food</p>
      </footer>
    </div>
  );
}

export default Home;
