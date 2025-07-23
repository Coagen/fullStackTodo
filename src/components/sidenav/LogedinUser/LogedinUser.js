import Image from "next/image";
import SideMenu from "../sideMenu/SideMenu";

import styles from "./LogedinUser.module.css";
import LogoutButton from "./LogoutButton";
async function LogedinUser({ session }) {
  return (
    <>
      <div className={styles.user}>
        <div className={styles.imageContainer}>
          <div className={styles.image}>
            <Image
              src={session.user.image}
              fill
              alt={session.user.image}
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <p className={styles.title}>{session.user.name}</p>
            <p className={styles.title}>{session.user.email}</p>
          </div>
        </div>
        <LogoutButton />
      </div>
      <SideMenu />
    </>
  );
}

export default LogedinUser;
