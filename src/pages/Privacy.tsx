
import { Link } from "react-router-dom";

function Privacy() {
  return (
    <div className="privacy-page">

      {/* Introduction */}
      <section className="privacy-hero">
        <div className="privacy-hero-content">
          <h1>Privacy Policy</h1>

          <h2>Your privacy matters to us.</h2>

          <p>
            At <strong>Good Food</strong>, we believe your personal
            information deserves just as much care as your favourite recipes.
          </p>

          <p>
            This Privacy Policy explains how information is used when you
            explore recipes, create an account, save your favourites, or
            share your own creations on our website.
          </p>

          <span className="privacy-date">
            Last Updated: 14 November 2026
          </span>
        </div>
      </section>

      {/* Privacy Policy Sections */}
      <section className="privacy-content">
        <div className="privacy-container">

          <div className="privacy-card">

            <section className="privacy-section">
              <h2>01. Information We Use</h2>

              <p>
                When you use Good Food, you may provide information such as:
              </p>

              <ul>
                <li>
                  <strong>Account Information:</strong> Details entered
                  when registering or signing in.
                </li>
                <li>
                  <strong>Your Recipes:</strong> Recipe names, ingredients,
                  instructions, images, and other details you add.
                </li>
                <li>
                  <strong>Saved Recipes:</strong> Recipes you bookmark
                  to access later.
                </li>
                <li>
                  <strong>Contact Information:</strong> Any details you
                  choose to provide through our contact form, if available.
                </li>
              </ul>

              <p>
                We encourage you not to enter sensitive personal information.
              </p>
            </section>

            <section className="privacy-section">
              <h2>02. How We Use Your Information</h2>

              <p>
                Information entered on Good Food is used to support
                the website's features, including:
              </p>

              <ul>
                <li>Allowing users to sign in and access their personal kitchen.</li>
                <li>Creating, editing, and managing recipes.</li>
                <li>Saving favourite recipes for easy access.</li>
                <li>Sharing published recipes through the Recipes page.</li>
                <li>Providing a smooth and personalised browsing experience.</li>
              </ul>
            </section>

            <section className="privacy-section">
              <h2>03. Your Recipes and Privacy</h2>

              <p>
                We believe you should have control over the recipes you create.
              </p>

              <p>
                When you add a recipe, it is initially marked as <strong>private</strong>.
              </p>

              <p>
                You can choose to publish it, making it available in the
                public Recipes section of the application.
              </p>

              <p>
                Once published, a recipe cannot be unpublished, although
                you can still edit or delete it.
              </p>

              <p>
                Your saved recipes are intended for your personal collection.
              </p>
            </section>

            <section className="privacy-section">
              <h2>04. Browser Storage and Authentication</h2>

              <p>
                Good Food is a student project that uses simulated
                authentication and client-side data management.
              </p>

              <p>
                Certain information, such as login status and recipe data,
                may be stored temporarily in your browser, depending on
                the application's configuration.
              </p>

              <p>
                Because Good Food does not use a full production authentication
                system, you should not enter real passwords or sensitive information.
              </p>

              <p>
                Some information may be lost when you refresh the page
                or clear your browser's stored data.
              </p>
            </section>

            <section className="privacy-section">
              <h2>05. Sharing Your Information</h2>

              <p>
                Recipes you choose to publish may appear in the public
                Recipes section.
              </p>

              <p>
                Good Food does not provide a feature for selling personal information.
              </p>

              <p>
                As this is a client-side demonstration application, publishing
                a recipe does not necessarily make it available across different
                devices or browsers.
              </p>
            </section>

            <section className="privacy-section">
              <h2>06. Third-Party Services</h2>

              <p>
                Good Food may use external services to host the website or
                display certain content.
              </p>

              <p>
                These services may process technical information according
                to their own privacy policies.
              </p>
            </section>

            <section className="privacy-section">
              <h2>07. Keeping Your Information Safe</h2>

              <p>
                We aim to provide a safe and enjoyable browsing experience.
              </p>

              <p>
                However, Good Food is an educational project and does not
                provide the same security features as a fully developed
                commercial application.
              </p>

              <p>
                Please avoid sharing confidential information through the website.
              </p>
            </section>

            <section className="privacy-section">
              <h2>08. Your Choices</h2>

              <p>
                You can manage your experience on Good Food by:
              </p>

              <ul>
                <li>Editing or deleting recipes you have created.</li>
                <li>Choosing whether to publish your recipes.</li>
                <li>Adding or removing recipes from your saved collection.</li>
                <li>Logging out of your account.</li>
                <li>Clearing locally stored website data through your browser settings.</li>
              </ul>
            </section>

            <section className="privacy-section">
              <h2>09. Changes to This Policy</h2>

              <p>
                We may update this Privacy Policy as Good Food develops
                and new features are introduced.
              </p>

              <p>
                Any updates will be reflected on this page.
              </p>
            </section>

            <section className="privacy-section privacy-contact">
              <h2>10. Contact Us</h2>

              <p>
                Have a question about this Privacy Policy or how Good Food works?
              </p>

              <p>
                We'd be happy to hear from you.
              </p>

              <p>
                Visit our <Link to="/contact">Contact</Link> page to get in touch.
              </p>
            </section>

          </div>

          {/* Closing Message */}
          <div className="privacy-signoff">
            <h2>Good Food — Find your next dish.</h2>
            <p>Made for food lovers, with care.</p>
          </div>

        </div>
      </section>

    </div>
  );
}

export default Privacy;
