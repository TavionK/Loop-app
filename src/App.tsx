import { useEffect, useState } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { supabase } from "./supabaseClient.ts";
import type { Session } from "@supabase/supabase-js";

import Header from "./components/Header";
import AddTask from "./components/AddTask";
import TodoList from "./components/TodoList.tsx";
import Auth from "./components/Auth.tsx";
import type { Task } from "./utils/tasks.ts";

gsap.registerPlugin(SplitText);

function App() {
  const [session, setSession] = useState<Session | null>(null);

  const [tasks, setTask] = useState<Task[]>(() => {
    const storedTasks: string | null = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  // Check for active session on mount and listen for auth changes
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Saves the list to local storage whenever the task array changes
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  if (!session) {
    return (
      <main className="min-h-dvh max-w-lg mx-auto px-6 py-8 flex flex-col">
        <Auth />
      </main>
    );
  }

  return (
    <main className="min-h-dvh max-w-3xl mx-auto px-6 py-8">
      <Header
        completeTaskCount={
          tasks.filter((task: Task): boolean => !task.isComplete).length
        }
        onLogout={() => supabase.auth.signOut()}
      />
      <AddTask setTask={setTask} />
      <hr className="my-8 border-gray-600" />
      <TodoList tasks={tasks} setTask={setTask} />
    </main>
  );
}

export default App;
