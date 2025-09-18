import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./App.module.css";
import { getUserFromToken, removeToken } from "../../utils/token";

export default function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [pic, setPic] = useState("");

  useEffect(() => {
    const loggedInUser = getUserFromToken();

    if (loggedInUser) {
      setUser(loggedInUser);
      if (loggedInUser.photoUrl) {
        setPic(loggedInUser.photoUrl);
      }
    }
  }, []);

  useEffect(() => {
    if (user && user.photoUrl) {
      setPic(user.photoUrl);
    } else {
      setPic("");
    }
  }, [user]);

  function handleLogOutClick() {
    removeToken();
    setUser(null);
  }

  return (
    <div className={styles.app}>
      <div className={styles.navBar}>
        <nav className={styles.navLinks}>
          <Link to="/">Home</Link>
          {user ? null : (
            <>
              <Link to="login">Log In</Link>
              <Link to="signup">Sign Up</Link>
            </>
          )}
        </nav>
        <div className={styles.loggedIn}>
          {user ? (
            <Link to="profile" className={styles.user}>
              <img
                className={
                  pic
                    ? styles.loggedInUserIcon
                    : `${styles.loggedInUserIcon} ${styles.noPic}`
                }
                src={pic ? pic : "/account-circle.svg"}
                alt="Logged in account"
              />
              {user.username}
            </Link>
          ) : null}
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
        <Outlet context={{ setUser, user, setError }}></Outlet>
      </div>
    </div>
  );
}
