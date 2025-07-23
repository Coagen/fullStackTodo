import { create } from "zustand";
import {
  deleteTaskFromSupabase,
  deleteToDoFromSupabase,
  getTaskFromSupabase,
  getToDoFromSupabase,
  saveTaskToSupabase,
  saveToDoToSupabase,
  updateTaskFromSupabase,
  updateTodoFromSupabase,
} from "./actions";

export const useUserStore = create((set) => ({
  userName: "",
  userEmail: "",
}));

export const useUserMenu = create((set) => ({
  userMenu: "toDoList",
  setMenu: (menu) => set(() => ({ userMenu: menu })),
}));

export const useTaskStore = create((set) => ({
  tasks: [],
  selectCategory: undefined,
  setCategory: (category) =>
    set({
      selectCategory: category || undefined,
    }),
  // FETCH
  fetchTasks: async () => {
    const data = await getTaskFromSupabase();
    set({ tasks: data || [] });
  },
  // ADD
  addTasks: async (formData) => {
    const result = await saveTaskToSupabase(formData);
    const data = await getTaskFromSupabase();
    set({ tasks: data || [] });
    return result;
  },
  // DELETE
  deleteTasks: async (taskId) => {
    const result = await deleteTaskFromSupabase(taskId);
    const data = await getTaskFromSupabase();
    set({ tasks: data || [] });
    return result;
  },
  // UPDATE
  updateTasks: async (taskId, newValue) => {
    const result = await updateTaskFromSupabase(taskId, newValue);
    const data = await getTaskFromSupabase();
    set({ tasks: data || [] });
    return result;
  },
  // ////////////////////////
  todos: [],
  // Fetch
  fetchTodos: async () => {
    const data = await getToDoFromSupabase();
    set({ todos: data || [] });
  },
  // ADD
  addTodos: async (formData) => {
    const result = await saveToDoToSupabase(formData);
    const data = await getToDoFromSupabase();
    set({ todos: data || [] });
    return result;
  },
  // DELETE
  deleteTodos: async (todoId) => {
    const result = await deleteToDoFromSupabase(todoId);
    const data = await getToDoFromSupabase();
    set({ todos: data || [] });
    return result;
  },
  // UPDATE
  updateTodos: async (todoId, newValue) => {
    const result = await updateTodoFromSupabase(todoId, newValue);
    const data = await getToDoFromSupabase();
    set({ todos: data || [] });
    return result;
  },
}));
