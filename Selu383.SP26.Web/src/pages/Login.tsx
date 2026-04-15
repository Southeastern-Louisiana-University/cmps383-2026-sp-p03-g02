import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

type CurrentUser = {
  id: number;
  userName: string;
  roles: string[];
};

type LoginProps = {
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser | null>>;
};

const Login = ({ setCurrentUser }: LoginProps) => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/authentication/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          userName,
          password,
        }),
      });

      if (response.ok) {
        const data: CurrentUser = await response.json();
        setCurrentUser(data);
        navigate("/");
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
      <h1>Login</h1>
      <p className="subtitle">Please log in to your account</p>

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
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;