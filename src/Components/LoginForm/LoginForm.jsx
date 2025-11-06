import styles from './LoginForm.module.css';


function LoginForm() {
  return (
    <div className={styles.wrapper}>
      <h1>Log in</h1>
      <form className={styles.form}>
        <label className={styles.label}>
          Username:
          <input type="text" name="username" className={styles.input} />
        </label>
        <label className={styles.label}>
          Password:
          <input type="password" name="password" className={styles.input} />
        </label>
        <button type="submit" className={styles.button}>Log In</button>
      </form>
    </div>
  );
}

export default LoginForm;