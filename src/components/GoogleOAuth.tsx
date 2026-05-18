import { useState } from "react";
import { supabase } from "../supabaseClient.ts";
import { FcGoogle } from "react-icons/fc";

export default function GoogleOAuth() {
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
    </div>
  );
}
