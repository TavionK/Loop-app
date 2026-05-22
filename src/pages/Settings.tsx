import { IoMdArrowBack } from "react-icons/io";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../supabaseClient.ts";
import { useEffect, useRef, useState } from "react";
import { Pencil, X, Check } from "lucide-react";

export default function Settings() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [savingName, setSavingName] = useState(false);
  const [nameError, setNameError] = useState<string | null>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
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

  function startEditing() {
    setNameInput(displayName ?? "");
    setNameError(null);
    setEditingName(true);
    setTimeout(() => nameInputRef.current?.focus(), 0);
  }

  function cancelEditing() {
    setEditingName(false);
    setNameError(null);
  }

  async function handleSaveName() {
    if (!nameInput.trim()) {
      setNameError("Name cannot be empty.");
      return;
    }
    setSavingName(true);
    setNameError(null);
    const { error } = await supabase.auth.updateUser({
      data: { display_name: nameInput.trim() },
    });
    if (error) {
      setNameError(error.message);
    } else {
      setDisplayName(nameInput.trim());
      setEditingName(false);
    }
    setSavingName(false);
  }

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
            {editingName ? (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <input
                    ref={nameInputRef}
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSaveName();
                      if (e.key === "Escape") cancelEditing();
                    }}
                    className="input-box my-0 h-9 text-sm"
                  />
                  <button
                    onClick={handleSaveName}
                    disabled={savingName}
                    title="Save"
                    className="cursor-pointer p-1.5 text-green-600 border border-green-300 rounded-md hover:bg-green-50 transition-colors duration-200 disabled:opacity-50"
                  >
                    <Check size={15} />
                  </button>
                  <button
                    onClick={cancelEditing}
                    title="Cancel"
                    className="cursor-pointer p-1.5 text-gray-500 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
                  >
                    <X size={15} />
                  </button>
                </div>
                {nameError && (
                  <p className="text-red-500 text-xs">{nameError}</p>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-gray-800">{displayName ?? "—"}</span>
                <button
                  onClick={startEditing}
                  title="Edit name"
                  className="cursor-pointer p-1 text-gray-400 hover:text-gray-700 transition-colors duration-200"
                >
                  <Pencil size={14} />
                </button>
              </div>
            )}
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
