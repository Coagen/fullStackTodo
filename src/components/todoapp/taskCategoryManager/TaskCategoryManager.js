import styles from "./TaskCategoryManager.module.css";
import TaskManager from "./task/TaskManager";
import TodoManager from "./todo/TodoManager";
function TaskCategoryManager() {
  return (
    <div className={styles.taskManager}>
      <h2 className={styles.heading}>Task Manager</h2>
      <TaskManager />
      <TodoManager />
    </div>
  );
}

export default TaskCategoryManager;
