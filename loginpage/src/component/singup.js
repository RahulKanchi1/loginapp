import React, { useState } from "react";
import axios from "axios";
import {  useNavigate , Link} from "react-router-dom";
import './login.css';

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const Navigate = useNavigate();

  async function register() {
    try {
      const response = await axios.post("http://localhost:5000/register", {
        email,
        password,
      });
      setMessage("Registration successful!");
      localStorage.setItem("token", response.data.token);
      setTimeout(() => {
        Navigate('/home')
        
      }, 1000); 
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred.");
    }
  }

  return (
    <div className="block1">
    <div>
    <form
        onSubmit={(e) => {
          e.preventDefault();
          register();
          setEmail("");
          setPassword("");
        }}
      >

        <h3>Singup</h3>
        <label htmlFor="email">Email</label>
        <br />
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="password">Password</label>
        <br />
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <input type="submit" value="Register" />
      </form>
      <h4> For existing User Login <Link to ="/login"> Login</Link></h4>
      {message }
    </div>
      
    </div>
  );
}

export default Signup;
