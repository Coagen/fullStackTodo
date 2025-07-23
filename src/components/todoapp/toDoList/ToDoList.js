import { useTaskStore } from "@/lib/user";
import { useEffect, useState } from "react";
import styles from "./ToDoList.module.css";
function ToDoList() {
  const { tasks, todos, fetchTodos, selectCategory, setCategory } =
    useTaskStore();
  const [checkedTodos, setCheckedTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleCheck = (id) => {
    setCheckedTodos((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className={styles.todoDiv}>
      <div className={styles.taskContainer}>
        {tasks?.map((task) => (
          <span
            onClick={() => setCategory(task.task_name)}
            key={task.id}
            className={`${styles.task} ${
              selectCategory === task.task_name ? styles.activeTask : ""
            }`}
          >
            {task.task_name}
          </span>
        ))}
      </div>
      <div className={styles.todoContainer}>
        {todos
          ?.filter((todo) => todo.task_name === selectCategory)
          .map((todo) => {
            const isChecked = checkedTodos.includes(todo.id);
            return (
              <div key={todo.id} className={styles.todo}>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleCheck(todo.id)}
                />
                <span
                  className={`${styles.userTodo} ${
                    isChecked ? styles.checked : ""
                  }`}
                >
                  {todo.user_todo}
                </span>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default ToDoList;
