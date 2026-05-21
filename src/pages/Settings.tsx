import { IoMdArrowBack } from "react-icons/io";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../supabaseClient.ts";
import { useEffect, useState } from "react";

export default function Settings() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      setEmail(user.email ?? null);

      setDisplayName(
        user.user_metadata?.display_name ??
          user.user_metadata?.full_name ??
          user.user_metadata?.name ??
          null,
      );
    }

    loadProfile();
  }, []);

  const handleDeleteAccount = async () => {
    if (
      !confirm(
        "Are you sure you want to delete your account? This cannot be undone.",
      )
    )
      return;
    setDeleting(true);
    setError(null);
    const { error } = await supabase.rpc("delete_user");
    if (error) {
      setError(error.message);
      setDeleting(false);
    } else {
      await supabase.auth.signOut();
      navigate("/login");
    }
  };

  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        className="cursor-pointer mb-6 flex items-center gap-1 w-fit px-2 py-1 bg-white text-gray-600 rounded-md border border-gray-300 hover:text-gray-900 transition-all duration-300 ease-in-out hover:drop-shadow-sm/25"
      >
        <IoMdArrowBack />
        Back
      </button>

      <h1 className="mb-8">Settings</h1>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Account</h2>
        <div className="space-y-4">
          <div className="flex flex-col">
            <span className="text-xs uppercase tracking-wide text-gray-500 mb-1">
              Name
            </span>
            <span className="text-gray-800">{displayName ?? "—"}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs uppercase tracking-wide text-gray-500 mb-1">
              Email
            </span>
            <span className="text-gray-800">{email ?? "—"}</span>
          </div>
        </div>
      </section>

      <hr className="my-6 border-gray-200" />

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Security</h2>
        <Link
          to="/update-password"
          className="inline-block px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200 ease-in-out"
        >
          Change Password
        </Link>
      </section>

      <hr className="my-6 border-gray-200" />

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-2 text-red-600">Danger Zone</h2>
        <p className="text-sm text-gray-500 mb-4">
          Permanently deletes your account and all associated data. This cannot
          be undone.
        </p>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button
          onClick={handleDeleteAccount}
          disabled={deleting}
          className="cursor-pointer px-4 py-2 text-sm bg-white text-red-600 border border-red-300 rounded-md hover:bg-red-50 transition-colors duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {deleting ? "Deleting..." : "Delete Account"}
        </button>
      </section>
    </div>
  );
}
