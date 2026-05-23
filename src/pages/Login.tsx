import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient.ts";
import { useState, type SubmitEvent } from "react";
import GoogleOAuth from "../components/GoogleOAuth.tsx";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: SubmitEvent) => {
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
          <label htmlFor="email" className="sr-only">Email</label>
          <input
            id="email"
            className="input-box w-full"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password" className="sr-only">Password</label>
          <input
            id="password"
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

        {error && (
          <p
            role="alert"
            className={`mt-4 w-full p-2 rounded-md text-center text-sm ${
              error.toLowerCase().includes("invalid")
                ? "bg-red-100 text-red-700"
                : "error"
            }`}
          >
            {error}
          </p>
        )}
        <Link
          to="/forgot-password"
          className="cursor-pointer link text-sm mt-4 text-right"
        >
          Forgot Password?
        </Link>

        <GoogleOAuth />
      </div>

      <p className="text-center text-sm">
        New to Loop?{" "}
        <Link to="/signup" className="link">
          Create an account
        </Link>
      </p>
    </div>
  );
}
