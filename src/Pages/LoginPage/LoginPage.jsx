import styles from './LoginPage.module.css';
import LoginForm from '../../Components/LoginForm/LoginForm';

function LoginPage() {
  return (
    <div className={styles.wrapper}>
      <LoginForm />
    </div>
  );
}

export default LoginPage;