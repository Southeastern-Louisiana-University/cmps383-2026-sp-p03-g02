import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Login.css";
// import type { UserGetDto } from "../types";

// type SignupProps = {
//   setCurrentUser: React.Dispatch<React.SetStateAction<UserGetDto | null>>;
// };

const Signup = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          userName,
          password,
          roles: ["User"],
        }),
      });

      if (response.ok) {
        navigate("/login");
      } else {
        setError("Invalid username or password.");
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError("Could not connect to the server.");
    }
  };

  return (
    <div className="login-page">
      <h1>Signup</h1>
      <p className="subtitle">
        Please fill in the following information to create your account
      </p>

      <form className="login-card" onSubmit={handleLogin}>
        <label htmlFor="userName">Username</label>
        <input
          id="userName"
          type="text"
          placeholder="Enter username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="login-error">{error}</p>}

        <button className="login-btn" type="submit">
          Sign up
        </button>
      </form>
      <p>
        Already have an account?
        <NavLink to="/login" className="login-link">
          Log in
        </NavLink>
      </p>
    </div>
  );
};

export default Signup;
