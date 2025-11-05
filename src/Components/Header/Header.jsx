import styles from "./Header.module.css";
import React from "react";
import SiteNav from "../SiteNav/SiteNav";

function Header() {
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
        <button className={styles.signupButton}>Sign up</button>
        <button className={styles.loginButton}>Log in</button>
      </div>
    </div>
  );
}

export default Header;
