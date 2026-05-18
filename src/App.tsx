import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { supabase } from "./supabaseClient.ts";
import type { Session } from "@supabase/supabase-js";

import Header from "./components/Header";
import AddTask from "./components/AddTask";
import TodoList from "./components/TodoList.tsx";
import type { Task } from "./utils/tasks.ts";
import Signup from "./components/Signup.tsx";
import Login from "./components/Login.tsx";
import ForgotPassword from "./components/ForgotPassword.tsx";
import UpdatePassword from "./components/UpdatePassword.tsx";
import Terms from "./components/Terms.tsx";
import PrivacyPolicy from "./components/PrivacyPolicy.tsx";

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

  return (
    <Routes>
      {/* Routes when no session is present */}
      <Route
        path="/login"
        element={
          !session ? (
            <main className="min-h-dvh max-w-lg mx-auto px-6 py-8 flex flex-col">
              <Login />
            </main>
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      <Route
        path="/signup"
        element={
          !session ? (
            <main className="min-h-dvh max-w-lg mx-auto px-6 py-8 flex flex-col">
              <Signup />
            </main>
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      <Route
        path="/forgot-password"
        element={
          <main className="min-h-dvh max-w-lg mx-auto px-6 py-8 flex flex-col">
            <ForgotPassword />
          </main>
        }
      />

      <Route
        path="/update-password"
        element={
          <main className="min-h-dvh max-w-lg mx-auto px-6 py-8 flex flex-col">
            <UpdatePassword />
          </main>
        }
      />

      <Route
        path="/terms-of-service"
        element={
          <main className="min-h-dvh max-w-lg mx-auto px-6 py-8 flex flex-col">
            <Terms />
          </main>
        }
      />

      <Route
        path="/privacy-policy"
        element={
          <main className="min-h-dvh max-w-lg mx-auto px-6 py-8 flex flex-col">
            <PrivacyPolicy />
          </main>
        }
      />

      {/* App route - only accessible when logged in */}
      <Route
        path="/"
        element={
          session ? (
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
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
}

export default App;
