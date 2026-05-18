import { useState } from "react";
import { supabase } from "../supabaseClient.ts";
import Login from "./Login.tsx";
import Signup from "./Signup.tsx";
import { FcGoogle } from "react-icons/fc";
import ResetPassword from "./ResetPassword.tsx";

export default function Auth() {
  const [view, setView] = useState<"login" | "signup" | "reset-password">(
    "login",
  );
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col justify-between grow">
      <div>
        {view === "login" && <Login setView={setView} />}
        {view === "signup" && <Signup />}
        {view === "reset-password" && <ResetPassword />}

        <div className="relative flex items-center my-6">
          <div className="grow border-t border-gray-300"></div>
          <span className="mx-4 text-sm text-gray-500">OR</span>
          <div className="grow border-t border-gray-300"></div>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="btn btn-secondary w-full flex items-center justify-center gap-2"
        >
          <FcGoogle aria-label="Google Icon" />
          Continue with Google
        </button>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
      {/*Toggle between login and signup*/}
      <p className="text-center">
        {view === "login" && (
          <>
            Don't have an account?{" "}
            <span
              onClick={() => setView("signup")}
              className="cursor-pointer text-purple-800 font-semibold underline"
            >
              Sign up
            </span>
          </>
        )}
        {view === "signup" && (
          <>
            Already have an account?{" "}
            <span
              onClick={() => setView("login")}
              className="cursor-pointer text-purple-800 font-semibold underline"
            >
              Login
            </span>
          </>
        )}
      </p>
    </div>
  );
}
