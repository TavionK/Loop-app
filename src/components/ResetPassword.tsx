import { useState } from "react";
import { supabase } from "../supabaseClient.ts";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:5173/update-password",
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage("Check your email for a password reset link!");
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="my-6">
        <h1 className="mb-2">Reset Password</h1>
        <p className="subheading">
          Enter your email and we'll send you a reset link.
        </p>
      </div>
      <form onSubmit={handleResetPassword}>
        <input
          type="email"
          placeholder="Email"
          className="input-box w-full"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className="btn py-3 mt-4 a11y-rings w-full"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>

      {message && <p className="text-green-600 text-sm mt-4">{message}</p>}
      {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
    </div>
  );
}
