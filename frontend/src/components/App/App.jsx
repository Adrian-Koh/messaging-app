import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./App.module.css";
import { getUserFromToken, removeToken } from "../../utils/token";

export default function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const loggedInUser = getUserFromToken();

    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  const updateLoggedInUser = (u) => {
    setUser(u);
  };

  function handleLogOutClick() {
    removeToken();
    updateLoggedInUser(null);
  }

  return (
    <div className={styles.app}>
      <div className={styles.navBar}>
        <nav className={styles.navLinks}>
          <Link to="/">Home</Link>
          <Link to="login">Log In</Link>
          <Link to="signup">Sign Up</Link>
        </nav>
        <div className={styles.loggedIn}>
          {user ? (
            <Link to="profile" className={styles.user}>
              <img
                className={styles.loggedInUserIcon}
                src={
                  user && user.photoUrl ? user.photoUrl : "/account-circle.svg"
                }
                alt="Logged in account"
              />
              {user.username}
            </Link>
          ) : (
            "Not logged in"
          )}
          {user ? (
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
        <Outlet context={{ updateLoggedInUser, user, setError }}></Outlet>
      </div>
    </div>
  );
}
