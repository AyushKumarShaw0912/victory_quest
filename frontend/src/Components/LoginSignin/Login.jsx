import React from "react";
import "./Login.css";
const Login = () => {
  return (
    <div className="container">
      <form action="">
        <div className="input-box">
          <text>Name</text>
          <input type="text" placeholder="Username" required />
        </div>
        <div className="input-box">
          <text>E-mail</text>
          <input type="text" placeholder="Email" required />
        </div>
        <div className="input-box">
          <text>Password</text>
          <input type="password" placeholder="Password" required />
        </div>

        <button type="submit">Sign In</button>

        <div className="regester-link">
          <p>
            Already have an account? <a href="#"> Sign Up</a>
          </p>
        </div>

        <div className="forgot-password">
          <a href="#">forgot Password? </a>
        </div>
      </form>
    </div>
  );
};

export default Login;
