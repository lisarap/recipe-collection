
function About() {
  const cookingPhoto = `${import.meta.env.BASE_URL}images/home/aboutcooking.jpg`;

  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="about-hero-inner">
          <h1>Good Food, Good Mood.</h1>
          <h2>A little about us</h2>

          <p>
            Welcome to <strong>Good Food</strong>, your little corner of the internet
            where good recipes and great ideas come together.
          </p>
        </div>
      </section>

      <section className="about-introduction">
        <div className="about-container about-intro-text">
          <p>
            We believe cooking should be simple, enjoyable, and full of
            flavour. Whether you're preparing your first homemade meal or
            trying something completely new, Good Food is here to make
            finding your next favourite dish a little easier.
          </p>

          <p>
            From quick breakfasts to comforting dinners and sweet treats,
            there's always something delicious waiting to be discovered.
          </p>
        </div>
      </section>

      <section className="about-community">
        <div className="about-container about-community-layout">
          <div className="about-community-text">
            <h2>Made for Food Lovers</h2>

            <p>
              Good Food is more than just a collection of recipes.
              It's a place where people can explore new flavours, save
              their favourites, and share their own creations with others.
            </p>

            <p>
              Whether you're an experienced home cook or just getting
              started, there's a place for you at our table.
            </p>
          </div>

          <img
            src={cookingPhoto}
            alt="Friends preparing food together in a kitchen"
            className="about-community-image"
            loading="lazy"
          />
        </div>
      </section>

      <section className="about-features">
        <div className="about-container">
          <h2>What Can You Do Here?</h2>

          <div className="about-feature-grid">
            <article className="about-feature-card">
              <h3>Discover Something Delicious</h3>
              <p>
                Explore a variety of recipes across breakfast, lunch,
                dinner, snacks, desserts, and drinks. Find something
                for every craving and every occasion.
              </p>
            </article>

            <article className="about-feature-card">
              <h3>Save What You Love</h3>
              <p>
                Found a recipe you can't wait to try? Save it to your
                personal collection so it's always easy to find when
                you need it.
              </p>
            </article>

            <article className="about-feature-card">
              <h3>Create Your Own Recipes</h3>
              <p>
                Keep your favourite homemade recipes organised in
                your own personal kitchen. Add, edit, and manage
                your creations whenever inspiration strikes.
              </p>
            </article>

            <article className="about-feature-card">
              <h3>Share the Goodness</h3>
              <p>
                Have a recipe worth sharing? Publish it for the
                Good Food community to discover, try, and enjoy.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="about-philosophy">
        <div className="about-container about-philosophy-inner">
          <h2>Our Little Philosophy</h2>

          <p>
            We believe the best meals aren't always the fanciest ones.
            Sometimes, it's the simplest dishes that bring the biggest
            smiles.
          </p>

          <p>
            Good food brings people together, inspires creativity,
            and turns ordinary moments into something special.
          </p>
        </div>
      </section>

      <section className="about-ending">
        <div className="about-container">
          <h2>Every great dish has a story. What's yours?</h2>

          <p>
            Explore. Create. Share. And most importantly, enjoy every bite.
          </p>

          <p className="about-signoff">
            Good Food — Find your next dish.
          </p>
        </div>
      </section>
    </div>
  );
}

export default About;
