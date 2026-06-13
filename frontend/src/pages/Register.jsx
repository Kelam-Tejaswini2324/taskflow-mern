import { useState } from "react";
import axios from "axios";
import "../styles/auth.css";
function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      setMessage("Name is required");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      await axios.post(
        "https://taskflow-backend-cqmr.onrender.com/api/auth/register",
        {
          name,
          email,
          password,
        }
      );

      setMessage("Registration Successful!");

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Registration Failed"
      );
    }
  };

  return (
  <div className="auth-container">
    <div className="auth-card">
      <>
  <h1
    style={{
      textAlign: "center",
      color: "white",
      marginBottom: "10px",
    }}
  >
    TaskFlow
  </h1>

  <h2 className="auth-title">
    Register
  </h2>
</>

      {message && (
        <p className="auth-message">
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <label>Name</label>

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

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

        <label>Confirm Password</label>

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(e.target.value)
          }
        />
<div className="auth-link">
  Already have an account?
  <a href="/login"> Login</a>
</div>
        <button
          className="auth-btn"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  </div>
);
}

export default Register;