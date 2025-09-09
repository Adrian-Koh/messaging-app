import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./App.module.css";
import { getUsernameFromToken, removeToken } from "../../utils/token";

export default function App() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const loggedInUsername = getUsernameFromToken();
    if (loggedInUsername) setUsername(loggedInUsername);
  }, []);

  const updateLoggedInUser = (uname) => {
    setUsername(uname);
  };

  function handleLogOutClick() {
    removeToken();
    updateLoggedInUser("");
  }

  return (
    <div className={styles.app}>
      <div className={styles.navBar}>
        <nav className={styles.navLinks}>
          <Link to="login">Log In</Link>
          <Link to="signup">Sign Up</Link>
        </nav>
        <div className={styles.loggedIn}>
          {username ? (
            <img
              className={styles.loggedInUserIcon}
              src="/account-circle.svg"
              alt="Logged in account"
            />
          ) : null}
          {username ? username : "Not logged in"}
          {username ? (
            <img
              className={styles.logOutIcon}
              src="/logout.svg"
              alt="Log out"
              onClick={handleLogOutClick}
            />
          ) : null}
        </div>
      </div>
      {error ? (
        <div className={styles.errorPanel}>
          {error}{" "}
          <button className={styles.dismissError} onClick={() => setError("")}>
            Dismiss
          </button>
        </div>
      ) : null}
      <div className={styles.container}>
        <Outlet context={{ updateLoggedInUser, setError }}></Outlet>
      </div>
    </div>
  );
}
