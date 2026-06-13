import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

function Login() {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [message, setMessage] = useState("");

const navigate = useNavigate();

useEffect(() => {
const token = localStorage.getItem("token");


if (token) {
  navigate("/dashboard");
}


}, [navigate]);

const handleSubmit = async (e) => {
e.preventDefault();


try {
  const response = await axios.post(
    "http://localhost:5000/api/auth/login",
    {
      email,
      password,
    }
  );

  localStorage.setItem(
    "token",
    response.data.token
  );

  navigate("/dashboard");
} catch (error) {
  setMessage(
    error.response?.data?.message ||
    "Login Failed"
  );
}


};

return ( <div className="auth-container"> <div className="auth-card">
<h1
style={{
textAlign: "center",
color: "white",
marginBottom: "10px",
fontSize: "36px",
fontWeight: "bold",
}}
>
TaskFlow </h1>


    <h2 className="auth-title">
      Welcome Back
    </h2>

    <p
      style={{
        textAlign: "center",
        color: "white",
        marginBottom: "20px",
      }}
    >
      Login to manage your tasks efficiently
    </p>

    {message && (
      <p className="auth-message">
        {message}
      </p>
    )}

    <form onSubmit={handleSubmit}>
      <label>Email</label>

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <label>Password</label>

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <button
        className="auth-btn"
        type="submit"
      >
        Login
      </button>

      <div className="auth-link">
        Don't have an account?
        <a href="/"> Register</a>
      </div>
    </form>
  </div>
</div>


);
}

export default Login;
