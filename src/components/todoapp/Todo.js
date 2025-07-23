"use client";

import { useUserMenu } from "@/lib/user";

import TaskCategoryManager from "./taskCategoryManager/TaskCategoryManager";
import ToDoList from "./toDoList/ToDoList";

import styles from "./Todo.module.css";
import Header from "../header/Header";

function Todo({ session }) {
  const { userMenu } = useUserMenu();

  if (!session?.user)
    return (
      <div className={styles.todo}>
        <Header />
        <p className={styles.heading}>You are not logged in.</p>;
      </div>
    );

  return (
    <div className={styles.todo}>
      <Header />
      {userMenu === "taskManager" && <TaskCategoryManager />}
      {userMenu === "toDoList" && <ToDoList />}
    </div>
  );
}

export default Todo;
