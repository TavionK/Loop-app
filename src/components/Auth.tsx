import { useState } from "react";
import { supabase } from "../supabaseClient.ts";
import * as React from "react";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
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

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      setError("Check your email for the confirmation link!");
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1 className="mb-6">{isLogin ? "Login" : "Sign Up"}</h1>

      <form onSubmit={isLogin ? handleLogin : handleSignup}>
        <input
          className="input-box w-full"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
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
          {loading ? "Loading..." : isLogin ? "Login" : "Sign Up"}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      <button
        className="cursor-pointer a11y-rings focus-visible:border-transparent  border border-gray-400 rounded-md p-2 mt-4"
        onClick={() => {
          setIsLogin(!isLogin);
          setError(null);
        }}
      >
        {isLogin
          ? "Don't have an account? Sign up"
          : "Already have an account? Login"}
      </button>
      <p>Other options</p>
      <button onClick={handleGoogleLogin} className="btn">
        Sign in with Google
      </button>
    </div>
  );
}
