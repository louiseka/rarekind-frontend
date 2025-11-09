import styles from "./Footer.module.css";
import React from "react";


function Footer() {
  return (
    <div className={styles.wrapper}>
      <div>
          <button className={styles.footerLink}>Footer link 1</button>
          <button className={styles.footerLink}>Footer link 2</button>
          </div>
          <div>
          <button className={styles.footerSubLink}>Terms and Conditions</button>
          <button className={styles.footerSubLink}>Cookies</button>
          </div>
          <p>© 2025 RareKind</p>
    </div>
  );
}

export default Footer;