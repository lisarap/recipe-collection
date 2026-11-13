
import { useState, type SubmitEvent } from "react";
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

function createAccount(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
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
    <section className="login-page">
      <h1>Create a Demo Account</h1>

      <p>
        Choose a username to start sharing and saving recipes
        on Good Food.
      </p>

      <form
        className="recipe-form"
        onSubmit={createAccount}
        noValidate
      >
        <div className="form-group">
          <label htmlFor="registerName">Username</label>

          <input
            id="registerName"
            type="text"
            value={accountName}
            onChange={(event) => setAccountName(event.target.value)}
            placeholder="Choose a username"
            autoComplete="username"
            required
          />
        </div>

        {registerError && (
          <p className="field-error" role="alert">
            {registerError}
          </p>
        )}

        <button type="submit" className="save-recipe-btn">
          Create Account
        </button>

        <p className="demo-login-info">
          This is a demo account for coursework.
          No real account or password is created.
        </p>

        <p>
          Already using Good Food?{" "}
          <Link
            to="/login"
            state={{ from: location.state?.from }}
          >
            Sign In
          </Link>
        </p>
      </form>
    </section>
  );
}

export default Register;
