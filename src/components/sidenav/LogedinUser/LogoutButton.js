import Image from "next/image";
import { handleSignout } from "@/lib/actions";

import styles from "./LogoutButton.module.css";
function LogoutButton() {
  return (
    <form action={handleSignout}>
      <button className={styles.button}>
        <Image
          src="https://authjs.dev/img/providers/google.svg"
          width={24}
          height={24}
          alt="Google"
        />
        <span>Signout With Google</span>
      </button>
    </form>
  );
}

export default LogoutButton;
