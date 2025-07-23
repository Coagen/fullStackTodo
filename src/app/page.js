import SideNav from "@/components/sidenav/SideNav";
import Todo from "@/components/todoapp/Todo";

import { auth } from "@/lib/auth";
import { saveUserToSupabase } from "@/lib/actions";

import styles from "./page.module.css";
async function page() {
  const session = await auth();

  if (session?.user) {
    await saveUserToSupabase({
      name: session.user.name,
      email: session.user.email,
    });
  }
  return (
    <>
      <div className={styles.mainApp}>
        <SideNav />
        <Todo session={session} />
      </div>
    </>
  );
}

export default page;
