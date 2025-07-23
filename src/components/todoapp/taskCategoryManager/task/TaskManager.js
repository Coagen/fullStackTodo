"use client";
import { useTaskStore } from "@/lib/user";
import { useEffect, useState } from "react";

import styles from "./TaskManager.module.css";
function TaskManager() {
  const [editableTaskId, setEditableTaskId] = useState(null);
  const [editText, setEditText] = useState("");

  const [error, setError] = useState();
  const { tasks, setCategory, fetchTasks, addTasks, deleteTasks, updateTasks } =
    useTaskStore();

  // initial fetch
  useEffect(() => {
    fetchTasks();
  }, [addTasks]);

  // Add New Task
  async function handleAdd(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const task_name = formData.get("task");
    const dataToSave = {
      task_name,
    };
    await addTasks(dataToSave);
  }
  // Delete Task
  async function handleDelete(e, taskId) {
    e.preventDefault();
    const error = await deleteTasks(taskId);

    if (error.error) setError("Delete ToDo's and Try Again");
    else {
      setError();
      setCategory(null);
    }
  }
  // Update Task
  async function handleUpdate(e, id, editText) {
    e.preventDefault();
    setEditText("");
    if (id === editableTaskId) {
      setEditableTaskId(null);
    } else setEditableTaskId(id);
    if (editText !== "") {
      const error = await updateTasks(id, editText);
      console.log(error);
      if (error.error) setError("Delete ToDo's and Try Again");
      else setError();
    }
  }
  return (
    <div className={styles.taskManager}>
      <form className={styles.taskForm} onSubmit={handleAdd}>
        <div>
          <div className={styles.inputContainer}>
            <input
              name="task"
              className={styles.input}
              type="text"
              placeholder="Enter Your Task Category"
              required
              onFocus={(e) => (e.target.value = "")}
            />
            <button type="submit" className={styles.button}>
              Add Category
            </button>
          </div>
          <p className={styles.error}>{error}</p>
        </div>
      </form>

      <div>
        {tasks?.map((task) => (
          <form className={styles.inputWrapper} key={task.id}>
            <input
              className={styles.inputTask}
              disabled={editableTaskId !== task.id}
              type="text"
              value={editableTaskId !== task.id ? task.task_name : editText}
              onChange={(e) => {
                setEditText(e.target.value);
              }}
            />
            <button
              onClick={(e) => {
                handleDelete(e, task.id);
              }}
              className={styles.clearBtn}
            >
              X
            </button>
            {editText === "" && editableTaskId !== task.id ? (
              <button
                className={styles.editBtn}
                onClick={(e) => {
                  handleUpdate(e, task.id);
                }}
              >
                i
              </button>
            ) : (
              <button
                className={styles.editBtn}
                onClick={(e) => {
                  handleUpdate(e, task.id, editText);
                }}
              >
                u
              </button>
            )}
          </form>
        ))}
      </div>
    </div>
  );
}

export default TaskManager;
