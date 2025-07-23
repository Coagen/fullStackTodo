import Image from "next/image";
import myLogo from "../../../../public/logo.png";

import styles from "./Logo.module.css";
function Logo() {
  return (
    <div className={styles.logo}>
      <Image src={myLogo} alt="Logo" width={70} height={70} />
      <h1 className={styles.heading}>To Do App</h1>
    </div>
  );
}

export default Logo;
