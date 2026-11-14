
import { useState } from "react";
import {
  Link,
  Navigate,
  useLocation,
  useNavigate
} from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

function Register() {
  const navigate = useNavigate();
  const location = useLocation();

  const { currentUser, signIn } = useAuthStore();

  const [accountName, setAccountName] = useState("");
  const [registerError, setRegisterError] = useState("");

  function createAccount() {
    setRegisterError("");

    const started = signIn(accountName, "demo123");

    if (!started) {
      setRegisterError(
        "Username must have 3 to 20 letters, numbers or underscores."
      );
      return;
    }

    navigate(location.state?.from || "/myRecipes", {
      replace: true
    });
  }

  if (currentUser) {
    return <Navigate to="/myRecipes" replace />;
  }

  return (
    <section className="auth-page register-page">
      <div className="auth-shell">

        <div className="auth-copy">
          <span className="auth-badge">Good Food</span>

          <h1>Join Our Kitchen</h1>

          <p>
            Create your own space on Good Food.
            Save your favourite recipes, share your
            cooking ideas, and discover something delicious.
          </p>

          <div className="auth-note-box">
            <h2>What can you do?</h2>

            <ul className="auth-note-list">
              <li>Save your favourite recipes</li>
              <li>Create and manage your own dishes</li>
              <li>Publish recipes for everyone to enjoy</li>
            </ul>
          </div>
        </div>

        <div className="auth-card">
          <div className="auth-card-top">
            <span className="auth-small-title">
              Get Started
            </span>

            <h2>Create an Account</h2>

            <p>
              Choose a username to join the Good Food community.
            </p>
          </div>

          <form
            className="auth-form"
            onSubmit={(event) => {
              event.preventDefault();
              createAccount();
            }}
            noValidate
          >
            <div className="auth-form-group">
              <label htmlFor="registerName">
                Username
              </label>

              <input
                id="registerName"
                type="text"
                value={accountName}
                onChange={(event) =>
                  setAccountName(event.target.value)
                }
                placeholder="Choose your username"
                autoComplete="username"
                required
              />
            </div>

            {registerError && (
              <p className="auth-error" role="alert">
                {registerError}
              </p>
            )}

            <button
              type="submit"
              className="auth-main-btn"
            >
              Create Account
            </button>
          </form>

          <div className="auth-demo-box">
            <p>
              <strong>Demo Registration</strong>
            </p>

            <p>
              This is a demo account for coursework.
              No real account or password is created.
            </p>
          </div>

          <p className="auth-bottom-link">
            Already using Good Food?{" "}
            <Link
              to="/login"
              state={{ from: location.state?.from }}
            >
              Sign In
            </Link>
          </p>
        </div>

      </div>
    </section>
  );
}

export default Register;
