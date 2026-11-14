import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const { currentUser, signIn } = useAuthStore();

  const [accountName, setAccountName] = useState("");
  const [accountPassword, setAccountPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  function signIntoAccount(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoginError("");

    const signedIn = signIn(accountName, accountPassword);

    if (!signedIn) {
      setLoginError("Please enter a valid username and the correct demo password.");
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
    <section className="auth-page">
      <div className="auth-shell">
        <div className="auth-copy">
          <span className="auth-badge">Good Food</span>

          <h1>Welcome Back</h1>

          <p>
            Sign in to save your favourite recipes, manage your own dishes,
            and share what you cook with the Good Food community.
          </p>

          <div className="auth-note-box">
            <h2>Why sign in?</h2>

            <ul className="auth-note-list">
              <li>Save recipes and view them later</li>
              <li>Add, edit and delete your own recipes</li>
              <li>Publish your recipes for everyone to see</li>
            </ul>
          </div>
        </div>

        <div className="auth-card">
          <div className="auth-card-top">
            <span className="auth-small-title">Sign In</span>
            <h2>Access your recipe space</h2>
            <p>
              Use your username and the demo password to continue.
            </p>
          </div>

          <form className="auth-form" onSubmit={signIntoAccount} noValidate>
            <div className="auth-form-group">
              <label htmlFor="loginName">Username</label>
              <input
                id="loginName"
                type="text"
                value={accountName}
                onChange={(event) => setAccountName(event.target.value)}
                placeholder="Enter your username"
                autoComplete="username"
                required
              />
            </div>

            <div className="auth-form-group">
              <label htmlFor="loginPassword">Password</label>
              <input
                id="loginPassword"
                type="password"
                value={accountPassword}
                onChange={(event) => setAccountPassword(event.target.value)}
                placeholder="Enter the demo password"
                autoComplete="current-password"
                required
              />
            </div>

            {loginError && (
              <p className="auth-error" role="alert">
                {loginError}
              </p>
            )}

            <button type="submit" className="auth-main-btn">
              Login
            </button>
          </form>

          <div className="auth-demo-box">
            <p>
              <strong>Demo password:</strong> demo123
            </p>
            <p>
              This is a demo login. Please don&apos;t use a real password.
            </p>
          </div>

          <p className="auth-bottom-link">
            Don&apos;t have an account yet?{" "}
            <Link
              to="/register"
              state={{ from: location.state?.from }}
            >
              Create one here
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Login;