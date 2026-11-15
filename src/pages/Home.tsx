
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

const homeImages = `${import.meta.env.BASE_URL}images/home/`;

const foodCategories = [
  { name: "Breakfast", category: "Breakfast", image: "categoryBreakfast.png" },
  { name: "Lunch", category: "Lunch", image: "categoryLunch.png" },
  { name: "Dinner", category: "Dinner", image: "categoryDinner.png" },
  { name: "Snack", category: "Snack", image: "categorySnack.png" },
  { name: "Dessert", category: "Dessert", image: "categoryDessert.png" },
  { name: "Drink", category: "Drinks", image: "categoryDrink.png" }
];


function Home() {
  const currentUser = useAuthStore((state) => state.currentUser);

  const categoryScroll = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const scrollArea = categoryScroll.current;

    if (!scrollArea) return;

    function checkArrows() {
      if (!scrollArea) return;

      setCanScrollLeft(scrollArea.scrollLeft > 5);

      setCanScrollRight(
        scrollArea.scrollLeft + scrollArea.clientWidth <
        scrollArea.scrollWidth - 5
      );
    }

    checkArrows();

    window.addEventListener("resize", checkArrows);
    scrollArea.addEventListener("scroll", checkArrows);

    return () => {
      window.removeEventListener("resize", checkArrows);
      scrollArea.removeEventListener("scroll", checkArrows);
    };
  }, []);

  function moveCategories(direction: number) {
    const scrollArea = categoryScroll.current;

    if (!scrollArea) return;

    scrollArea.scrollBy({
      left: direction * scrollArea.clientWidth * 0.8,
      behavior: "smooth"
    });
  }


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

          <div className="category-carousel">
            {canScrollLeft && (
              <button
                type="button"
                className="category-arrow category-arrow-left"
                onClick={() => moveCategories(-1)}
                aria-label="Scroll categories left"
              >
                ‹
              </button>
            )}

            <div
              className="category-grid"
              ref={categoryScroll}
              role="region"
              aria-label="Recipe categories"
              tabIndex={0}
            >
              {foodCategories.map((mealType) => (
                <Link
                  to={`/recipes?category=${mealType.category}`}
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

            {canScrollRight && (
              <button
                type="button"
                className="category-arrow category-arrow-right"
                onClick={() => moveCategories(1)}
                aria-label="Scroll categories right"
              >
                ›
              </button>
            )}
          </div>
        </div>
      </section>



    <section className="closing-section">
      <h2>A LITTLE TASTE OF EVERYTHING.</h2>

      <p>
        EXPLORE, EXPERIMENT, AND MAKE EVERY MEAL YOUR OWN.
        THERE'S ALWAYS SOMETHING DELICIOUS WAITING TO BE DISCOVERED.
      </p>
    </section>



    </div>
  );
}

export default Home;
