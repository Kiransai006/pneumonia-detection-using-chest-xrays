import { useState } from "react";
import { apiBaseUrl } from "../data/results.js";

const loginUrl = `${apiBaseUrl}/login`;
const registerUrl = `${apiBaseUrl}/register`;

export default function LoginPage({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const url = isRegister ? registerUrl : loginUrl;

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (isRegister) {
          if (data.success) {
            setMessage("Account created. Please log in.");
            setIsRegister(false);
            setPassword("");
          } else {
            setMessage(data.message);
          }
        } else {
          if (data.success) {
            onLogin();
          } else {
            setMessage(data.message);
          }
        }
      })
      .catch(() => {
        setLoading(false);
        setMessage("Cannot reach the server. Is the backend running?");
      });
  }

  return (
    <div className="loginWrap">
      <form className="loginCard" onSubmit={handleSubmit}>
        <div className="brand loginBrand">Pneumo<span>Detect</span></div>
        <p className="loginSub">{isRegister ? "Create a new account" : "Please log in to use the application"}</p>

        <input
          className="loginInput"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)} />

        <input
          className="loginInput"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} />

        {message && <p className="loginError">{message}</p>}

        <button className="btn" type="submit" disabled={loading}>
          {loading ? "Please wait..." : (isRegister ? "Register" : "Login")}
        </button>

        <p className="switchAuth" onClick={() => { setIsRegister(!isRegister); setMessage(""); }}>
          {isRegister ? "Already have an account? Login" : "Don't have an account? Register"}
        </p>
      </form>
    </div>
  );
}