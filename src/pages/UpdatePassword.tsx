import { useEffect, useState, type SubmitEvent } from "react";
import { supabase } from "../supabaseClient.ts";
import { Link, useNavigate } from "react-router-dom";
import GoogleOAuth from "../components/GoogleOAuth.tsx";

export default function UpdatePassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleUpdatePassword = async (e: SubmitEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      setError(error.message);
    } else {
      alert("Password updated successfully!");
      navigate("/login");
    }
    setLoading(false);
  };

  useEffect(() => {
    // Check if there's a valid session from the email link
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        setError("Invalid or expired reset link");
      }
    });
  }, []);

  return (
    <div className="flex flex-col justify-between grow">
      <div>
        <div className="my-6">
          <h1 className="mb-2">Update Password</h1>
          <p className="subheading">Enter in your new password below.</p>
        </div>
        <form onSubmit={handleUpdatePassword} className="space-y-4">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full input-box"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
              className="w-full input-box"
            />
          </div>

          <button type="submit" disabled={loading} className="w-full btn">
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>

        {error && <p role="alert" className="text-red-500 text-sm mt-4">{error}</p>}

        <GoogleOAuth />
      </div>

      <p className="text-center text-sm">
        Remembered it?{" "}
        <Link to="/signup" className="text-purple-800">
          Back to sign up
        </Link>
      </p>
    </div>
  );
}
