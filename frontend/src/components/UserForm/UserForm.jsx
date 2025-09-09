import { useEffect, useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import styles from "./UserForm.module.css";
import { submitSignup, submitLogin } from "./user-form";

const UserForm = ({ action }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [bio, setBio] = useState("");
  const [title, setTitle] = useState("");

  const navigate = useNavigate();
  const { updateLoggedInUser, setError } = useOutletContext();

  async function onSubmit(e) {
    e.preventDefault();

    try {
      if (action === "signup") {
        await submitSignup(username, password, file, bio);
        navigate("/login");
      } else if (action === "login") {
        await submitLogin(username, password);
        updateLoggedInUser(username);
        navigate("/");
      }
    } catch (err) {
      setError(err.message);
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
      <h1 className={styles.title}>{title}</h1>
      <form onSubmit={onSubmit} className={styles.form}>
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
        {action === "signup" ? (
          <>
            <label htmlFor="file">Upload profile picture: </label>
            <input
              type="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="bio">Brief introduction: </label>
            <textarea
              className={styles.inputField}
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows="10"
            />
          </>
        ) : null}
        <input type="submit" className={styles.submit} />
      </form>
    </>
  );
};

export { UserForm };
