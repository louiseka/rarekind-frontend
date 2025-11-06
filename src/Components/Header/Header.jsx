import styles from "./Header.module.css";
import React from "react";
import SiteNav from "../SiteNav/SiteNav";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();

  return (
    <div className={styles.wrapper}>
      <img
        src="/images/rarekindlogo.png"
        alt="RareKind Logo"
        className={styles.logo}
      />

      <div>
        <SiteNav />
      </div>
      <div className={styles.userButtons}>
        <Link to="/signup">
          <button className={styles.signupButton}>Sign up</button>
        </Link>
        <Link to="/login">
          <button className={styles.loginButton}>Log in</button>
        </Link>
      </div>
    </div>
  );
}

export default Header;
