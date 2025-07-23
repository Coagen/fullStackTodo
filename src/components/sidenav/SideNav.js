import Logo from "./logo/Logo";
import Login from "./loginForm/Login";
import LogedinUser from "./LogedinUser/LogedinUser";

import styles from "./SideNav.module.css";
import { auth } from "@/lib/auth";
import Footer from "./footer/Footer";
async function SideNav() {
  const session = await auth();
  return (
    <nav className={styles.nav}>
      {session?.user.name ? <LogedinUser session={session} /> : <Login />}
      <div>
        <Logo />
        <Footer />
      </div>
    </nav>
  );
}

export default SideNav;
