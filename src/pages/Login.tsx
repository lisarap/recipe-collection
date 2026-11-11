
import { useState, type FormEvent } from "react";
import {
  Navigate,
  useLocation,
  useNavigate
} from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const { currentUser, signIn } = useAuthStore();

  const [accountName, setAccountName] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  function submitLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoginError("");

    if (!/^[a-z0-9_]{3,20}$/i.test(accountName.trim())) {
      setLoginError(
        "Username must be 3 to 20 characters. Use letters, numbers or underscores."
      );
      return;
    }

    if (!password.trim()) {
      setLoginError("Please enter the demo password.");
      return;
    }

    const loggedIn = signIn(accountName, password);

    if (!loggedIn) {
      setLoginError("Incorrect demo password. Try demo123.");
      return;
    }

    navigate(location.state?.from || "/recipes", {
      replace: true
    });
  }

  if (currentUser) {
    return <Navigate to="/recipes" replace />;
  }

  return (
    <section className="login-page">
      <h1>Welcome Back</h1>
      <p>Sign in to add and manage your recipes.</p>

      <form className="recipe-form" onSubmit={submitLogin} noValidate>
        <div className="form-group">
          <label htmlFor="accountName">Username</label>
          <input
            id="accountName"
            type="text"
            autoComplete="username"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
            placeholder="Enter your username"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="accountPassword">Password</label>
          <input
            id="accountPassword"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter the demo password"
            required
          />
        </div>

        {loginError && (
          <p className="field-error" role="alert">
            {loginError}
          </p>
        )}

        <button className="save-recipe-btn" type="submit">
          Login
        </button>

        <p className="demo-login-info">
          Demo password: <strong>demo123</strong>
        </p>
        <p className="demo-login-info">
          This is a demo login. Please don't use a real password.
        </p>
      </form>
    </section>
  );
}

export default Login;
