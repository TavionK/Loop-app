import { useState } from "react";
import { supabase } from "../supabaseClient.ts";
import Login from "./Login.tsx";
import Signup from "./Signup.tsx";
import { FcGoogle } from "react-icons/fc";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
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
        {isLogin ? <Login /> : <Signup />}

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
    </div>
  );
}
