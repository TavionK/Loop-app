import * as React from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient.ts";
import { useState } from "react";
import Auth from "./Auth.tsx";

// interface LoginProps {
//   setView: (
//     value:
//       | ((
//           prevState: "login" | "signup" | "reset-password",
//         ) => "login" | "signup" | "reset-password")
//       | "login"
//       | "signup"
//       | "reset-password",
//   ) => void;
// }

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col justify-between grow">
      <div className="flex flex-col">
        <div className="my-6">
          <h1 className="mb-2">Welcome Back</h1>
          <p className="subheading">Sign in to keep your day on track.</p>
        </div>

        <form onSubmit={handleLogin}>
          <input
            aria-label="Email"
            className="input-box w-full"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            aria-label="Password"
            className="input-box w-full"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            className="btn py-3 mt-4 a11y-rings w-full"
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : "Sign in"}
          </button>
        </form>

        {error && <p className="error">{error}</p>}
        <Link
          to="/reset-password"
          className="cursor-pointer text-purple-800 text-sm mt-4 text-right"
        >
          Forgot Password?
        </Link>

        <Auth />
      </div>

      <p className="text-center text-sm">
        New to Loop?{" "}
        <Link to="/signup" className="text-purple-800">
          Create an account
        </Link>
      </p>
    </div>
  );
}
