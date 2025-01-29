import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form submission refresh
    if (!email || !password) {
      setMessage("Both fields are required.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      setMessage("Login successful!");
      localStorage.setItem("token", response.data.token);

      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred.");
    } finally {
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="block1">
      <div>
        <form onSubmit={handleLogin}>
          <h3>Login</h3>
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <input type="submit" value="Login" />
        </form>
        <h4>
          For a new account, <Link to="/">Signup</Link>
        </h4>
        {message && (
          <p style={{ color: message.includes("successful") ? "green" : "red" }}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
