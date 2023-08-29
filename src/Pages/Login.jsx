import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../ProtectedRoutes/useAuth";
function Login() {

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // To track authentication error
  
  const navigate = useNavigate();
  const isAunthenticate = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform authentication logic here
    if (user === "admin" && password === "admin") {
      handleLogin(); // Proceed to login if credentials are correct
    } else {
      setError("Invalid username or password !!"); // Set an error message
    }
  };

  const handleLogin = () => {
    const res = {
      data: {
        token: "login", // Mock token value
      },
    };
    const token = res.data.token; //let's take some string 'dev' as token
    localStorage.setItem("token", JSON.stringify(token));
    console.log(token);
    setError(null); // Clear any previous errors
    navigate("/");

    if (isAunthenticate) {
      navigate("/");
    }
  };

  return (
    <div className="login body1">
      <div className="login-container">
        <h1>Login</h1>
        {error && <p className="error fw-bolder">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="user">User</label>
          <input
            type="text"
            id="user"
            name="user"
            value={user}
            onChange={(event) => setUser(event.target.value)}
            required
            autoComplete="username"
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            autoComplete="current-password"
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
