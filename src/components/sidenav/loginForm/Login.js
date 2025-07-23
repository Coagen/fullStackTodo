import styles from "./Login.module.css";
import LoginButton from "./LoginButton";

export default function Login() {
  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.title}>Login To Access Application</h2>
      <LoginButton />
    </div>
  );
}
