import { useEffect, useState } from "react";
import { useTaskStore } from "@/lib/user";

import styles from "./TodoManager.module.css";
function TodoManager() {
  const [editableTaskId, setEditableTaskId] = useState(null);
  const [editText, setEditText] = useState("");

  const {
    selectCategory,
    setCategory,
    tasks,
    todos,
    fetchTodos,
    fetchTasks,
    addTodos,
    deleteTodos,
    updateTodos,
  } = useTaskStore();

  useEffect(() => {
    fetchTasks();
    fetchTodos();
  }, [addTodos]);

  // Add New To Do
  async function handleAdd(e) {
    e.preventDefault();
    if (selectCategory === undefined) return;
    const formData = new FormData(e.target);
    const user_todo = formData.get("user_todo");
    const task_name = selectCategory;
    const dataToSave = {
      task_name,
      user_todo,
    };
    await addTodos(dataToSave);
  }
  // UPDATE
  async function handleUpdate(e, id, editText) {
    e.preventDefault();

    setEditText("");
    if (id === editableTaskId) {
      setEditableTaskId(null);
    } else setEditableTaskId(id);
    if (editText !== "") await updateTodos(id, editText);
  }
  // Delete Task
  async function handleDelete(e, todoId) {
    e.preventDefault();
    await deleteTodos(todoId);
  }
  return (
    <div>
      <h2 className={styles.heading}>To Do Manager</h2>
      <form className={styles.selectContainer} onSubmit={handleAdd}>
        <select
          onChange={(e) => setCategory(e.target.value)}
          className={styles.input}
        >
          <option value={undefined}>Select Category</option>
          {tasks.map((task) => (
            <option key={task.id} value={task.task_name}>
              {task.task_name}
            </option>
          ))}
        </select>
        <div className={styles.todoInputContainer}>
          <input
            name="user_todo"
            className={styles.input}
            type="text"
            placeholder="Enter Your To Do..."
            onFocus={(e) => {
              e.target.value = "";
            }}
            required
          />
          <button type="submit" className={styles.button}>
            Add ToDo List
          </button>
        </div>
      </form>
      <div>
        {todos
          ?.filter((todo) => todo.task_name === selectCategory)
          .map((todo) => {
            return (
              <form className={styles.inputWrapper} key={todo.id}>
                <input
                  className={styles.inputTask}
                  disabled={editableTaskId !== todo.id}
                  type="text"
                  value={editableTaskId !== todo.id ? todo.user_todo : editText}
                  onChange={(e) => {
                    setEditText(e.target.value);
                  }}
                />
                <button
                  onClick={(e) => {
                    handleDelete(e, todo.id);
                  }}
                  className={styles.clearBtn}
                >
                  X
                </button>
                {editText === "" && editableTaskId !== todo.id ? (
                  <button
                    className={styles.editBtn}
                    onClick={(e) => {
                      handleUpdate(e, todo.id);
                    }}
                  >
                    i
                  </button>
                ) : (
                  <button
                    className={styles.editBtn}
                    onClick={(e) => {
                      handleUpdate(e, todo.id, editText);
                    }}
                  >
                    u
                  </button>
                )}
              </form>
            );
          })}
      </div>
    </div>
  );
}

export default TodoManager;
