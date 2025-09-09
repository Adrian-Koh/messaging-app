import { useEffect, useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import styles from "./UserForm.module.css";
const BACKEND_DOMAIN = "http://localhost:8000";

const UserForm = ({ action }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");

  const navigate = useNavigate();
  const { updateLoggedInUser, setError } = useOutletContext();

  async function onSubmit(e) {
    e.preventDefault();

    const response = await fetch(BACKEND_DOMAIN + `/users/${action}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const parsed = await response.json();

    if (!response.ok) {
      setError(parsed.message);
      return;
    }

    if (action === "login") {
      updateLoggedInUser(username);
      const token = parsed.token;
      localStorage.setItem("token", token);
      navigate("/");
    } else if (action === "signup") {
      navigate("/login");
    }
  }

  useEffect(() => {
    if (action === "login") {
      setTitle("Log In");
    } else if (action === "signup") {
      setTitle("Sign Up");
    }
  }, [action]);

  return (
    <>
      <h1>{title}</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="username">Username: </label>
        <input
          className={styles.inputField}
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password: </label>
        <input
          className={styles.inputField}
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" />
      </form>
    </>
  );
};

export { UserForm };
