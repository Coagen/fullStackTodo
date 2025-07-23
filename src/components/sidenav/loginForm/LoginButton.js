import Image from "next/image";
import { handleSignin } from "@/lib/actions";

import styles from "./LoginButton.module.css";
function LoginButton() {
  return (
    <form action={handleSignin}>
      <button className={styles.button}>
        <Image
          src="https://authjs.dev/img/providers/google.svg"
          width={24}
          height={24}
          alt="Google"
        />
        <span>Continue With Google</span>
      </button>
    </form>
  );
}

export default LoginButton;
