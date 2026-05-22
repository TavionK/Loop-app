import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { supabase } from "./supabaseClient.ts";
import type { Session } from "@supabase/supabase-js";

import Header from "./components/Header";
import AddTask from "./components/AddTask";
import TodoList from "./components/TodoList.tsx";
import type { Task } from "./utils/tasks.ts";
import Signup from "./pages/Signup.tsx";
import Login from "./pages/Login.tsx";
import ForgotPassword from "./pages/ForgotPassword.tsx";
import UpdatePassword from "./pages/UpdatePassword.tsx";
import Terms from "./pages/Terms.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
import Settings from "./pages/Settings.tsx";

function App() {
  const [session, setSession] = useState<Session | null>(null);

  const [tasks, setTask] = useState<Task[]>([]);

  useEffect(() => {
    async function loadTasks(userId: string) {
      const { data } = await supabase
        .from("tasks")
        .select("id, title, completed")
        .eq("user_id", userId);
      if (data) {
        setTask(
          data.map((row) => ({
            id: row.id,
            text: row.title,
            isComplete: row.completed ?? false,
          })),
        );
      }
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) void loadTasks(session.user.id);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        void loadTasks(session.user.id);
      } else {
        setTask([]);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

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

      <Route
        path="/settings"
        element={
          session ? (
            <main className="min-h-dvh max-w-lg mx-auto px-6 py-8">
              <Settings />
            </main>
          ) : (
            <Navigate to="/login" replace />
          )
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
              <AddTask setTask={setTask} userId={session.user.id} />
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
