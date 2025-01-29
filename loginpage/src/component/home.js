import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const logout = () => {
    try {
      // Clear authentication data
      localStorage.removeItem("token");
      navigate("/"); // Redirect to login page
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", fontSize: "2rem", padding: "2rem" }}>
      <p>Welcome to the home page! You’ve successfully logged in.</p>
      <button
        onClick={logout}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "1rem",
          borderRadius: "5px",
          cursor: "pointer",
          backgroundColor: "#007BFF",
          color: "#fff",
          border: "none",
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Home;
