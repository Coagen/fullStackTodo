"use client";

import { useUserMenu } from "@/lib/user";
import styles from "./SideMenu.module.css";
function SideMenu() {
  const { setMenu } = useUserMenu();

  return (
    <ul className={styles.menuList}>
      <li className={styles.menuItem} onClick={() => setMenu("toDoList")}>
        Todo List
      </li>
      <li className={styles.menuItem} onClick={() => setMenu("taskManager")}>
        Task Category
      </li>
    </ul>
  );
}

export default SideMenu;
