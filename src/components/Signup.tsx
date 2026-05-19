import * as React from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient.ts";
import { useState } from "react";
import GoogleOAuth from "./GoogleOAuth.tsx";

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: displayName,
        },
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setError("Check your email for the confirmation link!");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col justify-between grow">
      <div className="grow">
        <div className="my-6">
          <h1 className="mb-2">Create your account</h1>
          <p className="subheading">Start organizing in under a minute.</p>
        </div>

        <form onSubmit={handleSignup}>
          <input
            className="input-box w-full"
            type="text"
            placeholder="Display Name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
          />

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

          {error && <p className="error">{error}</p>}
          <p className="text-xs text-gray-500 mt-4">
            By signing up you agree to our{" "}
            <Link className="link" to="/terms-of-service">
              Terms
            </Link>{" "}
            and{" "}
            <Link className="link" to="/privacy-policy">
              Privacy Policy
            </Link>
            .
          </p>
          <button
            className="btn py-3 mt-4 a11y-rings w-full"
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : "Create Account"}
          </button>
        </form>

        <GoogleOAuth />
      </div>

      <p className="text-center text-sm">
        Already have an account?{" "}
        <Link to="/login" className="link">
          Sign in
        </Link>
      </p>
    </div>
  );
}
