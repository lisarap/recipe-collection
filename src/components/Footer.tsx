
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import AuthPrompt from "./AuthPrompt";

function Footer() {
  const currentUser = useAuthStore((state) => state.currentUser);
  const [showKitchenPrompt, setShowKitchenPrompt] = useState(false);

  return (
    <footer className="goodfood-footer">
      <div className="footer-main">
        <Link to="/" className="footer-logo-link">
          <img
            src={`${import.meta.env.BASE_URL}images/home/goodfoodLogo.png`}
            alt="Good Food - Find your next dish"
            className="footer-logo"
          />
        </Link>

        <nav className="footer-menu" aria-label="Footer navigation">
          <Link to="/about">
            about
          </Link>

          <Link to="/recipes">
            recipes
          </Link>

          {currentUser ? (
            <Link to="/myRecipes">
              my kitchen
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => setShowKitchenPrompt(true)}
            >
              my kitchen
            </button>
          )}

          <Link to="/privacy">privacy</Link>
          <Link to="/contact">contact</Link>
        </nav>

        <div className="footer-social">
          <h3>Follow Us</h3>

          <div className="footer-social-icons" aria-hidden="true">
            <span className="footer-facebook">f</span>

            <span className="footer-instagram">
              <svg
                viewBox="0 0 24 24"
                width="43"
                height="43"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <rect x="2" y="2" width="20" height="20" rx="6" />
                <circle cx="12" cy="12" r="4" />
                <circle
                  cx="17.5"
                  cy="6.5"
                  r="1"
                  fill="currentColor"
                  stroke="none"
                />
              </svg>
            </span>

            <span className="footer-tiktok">
              <svg
                viewBox="0 0 24 24"
                width="27"
                height="27"
                fill="currentColor"
              >
                <path d="M16.7 2c.1 2.5 1.5 4.1 4 4.3v3.5c-1.6 0-3-.5-4-1.3v7.2c0 4.1-3.2 6.7-6.9 6.7S3 19.6 3 15.8c0-3.9 3-6.8 6.8-6.8.6 0 1.2.1 1.7.2v3.6a4 4 0 0 0-1.7-.4c-1.9 0-3.3 1.4-3.3 3.3 0 1.8 1.3 3.1 3.3 3.1 1.8 0 3.2-1.3 3.2-3.1V2h3.7Z" />
              </svg>
            </span>
          </div>
        </div>
      </div>

      <AuthPrompt
        isOpen={showKitchenPrompt}
        promptType="myRecipes"
        returnTo="/myRecipes"
        onClose={() => setShowKitchenPrompt(false)}
      />
    </footer>
  );
}

export default Footer;
