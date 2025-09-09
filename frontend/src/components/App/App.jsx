import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./App.module.css";

export default function App() {
  return (
    <div className={styles.app}>
      <div className={styles.navBar}>
        <nav className={styles.navLinks}>
          <Link to="login">Log In</Link>
          <Link to="signup">Sign Up</Link>
        </nav>
      </div>
      <div className={styles.container}>
        <Outlet context={{}}></Outlet>
      </div>
    </div>
  );
}
