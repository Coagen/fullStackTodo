"use server";
import { auth } from "@/lib/auth";
import { supabase } from "./supabase";
import { signIn, signOut } from "./auth";

export async function handleSignin() {
  await signIn("google", { redirectTo: "/" });
}

export async function handleSignout() {
  await signOut({ redirectTo: "/" });
}
// Save User
export async function saveUserToSupabase({ name, email }) {
  const { error } = await supabase.from("users").upsert(
    {
      name,
      email,
    },
    {
      onConflict: "email", // use email as unique constraint
    }
  );

  if (error) console.error("Error saving user to Supabase:", error.message);
}
// Save Task
export async function saveTaskToSupabase(formData) {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("User not authenticated");
  }

  const task = formData.task_name;

  const { error } = await supabase.from("user_task").upsert(
    {
      email: session.user.email,
      task_name: task,
    },
    {
      onConflict: "email,task_name", // <-- must match unique constraint
    }
  );

  if (error) {
    throw new Error(error.message);
  }
}
// Fetch Task
export async function getTaskFromSupabase() {
  const session = await auth();

  const email = session?.user?.email;

  if (!email) {
    console.warn("No user session found.");
    return [];
  }

  const { data, error } = await supabase
    .from("user_task")
    .select("*")
    .eq("email", email)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching tasks:", error.message);
    return [];
  }

  return data;
}
// Delete Task
export async function deleteTaskFromSupabase(task_id) {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) {
    console.warn("No user session found.");
    return { error: "Unauthorized" };
  }

  const { data, error } = await supabase
    .from("user_task")
    .delete()
    .eq("id", task_id)
    .eq("email", email); // ensures user can only delete their own task

  if (error) {
    console.error("Error deleting task:", error.message);
    return { error: error.message };
  }

  return { success: true, data };
}
// Update Task
export async function updateTaskFromSupabase(task_id, newTaskValue) {
  const session = await auth();
  const email = session?.user?.email;

  if (!email) {
    console.warn("No user session found.");
    return { error: "Unauthorized" };
  }

  const { data, error } = await supabase
    .from("user_task")
    .update({ task_name: newTaskValue }) // 👈 field you want to update
    .eq("id", task_id) // 👈 match by task_id
    .eq("email", email) // 👈 ensure user-specific update
    .select();

  if (error) {
    console.error("Error updating task:", error.message);
    return { error: error.message };
  }

  return { success: true, data };
}
// ////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////
// Fetch ToDo
export async function getToDoFromSupabase() {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) {
    console.warn("No user session found.");
    return [];
  }

  const { data, error } = await supabase
    .from("user_todo")
    .select("*")
    .eq("email", email)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching todos:", error.message);
    return [];
  }
  return data;
}
// Save ToDo
export async function saveToDoToSupabase(formData) {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("User not authenticated");
  }

  const email = session.user.email;
  const task = formData.task_name;
  const todo = formData.user_todo;

  const { error } = await supabase.from("user_todo").upsert(
    {
      email,
      task_name: task,
      user_todo: todo,
    },
    {
      onConflict: "task_name,user_todo", // <-- must match unique constraint
    }
  );

  if (error) {
    throw new Error(error.message);
  }
}
// Delete ToDo
export async function deleteToDoFromSupabase(todo_id) {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) {
    console.warn("No user session found.");
    return { error: "Unauthorized" };
  }

  const { data, error } = await supabase
    .from("user_todo")
    .delete()
    .eq("id", todo_id)
    .eq("email", email); // ensures user can only delete their own task

  if (error) {
    console.error("Error deleting todo:", error.message);
    return { error: error.message };
  }

  return { success: true, data };
}
// Update ToDo
export async function updateTodoFromSupabase(todo_id, newTodoValue) {
  const session = await auth();
  const email = session?.user?.email;

  if (!email) {
    console.warn("No user session found.");
    return { error: "Unauthorized" };
  }

  const { data, error } = await supabase
    .from("user_todo")
    .update({ user_todo: newTodoValue }) // 👈 field you want to update
    .eq("id", todo_id) // 👈 match by task_id
    .eq("email", email) // 👈 ensure user-specific update
    .select();

  if (error) {
    console.error("Error updating task:", error.message);
    return { error: error.message };
  }

  return { success: true, data };
}
