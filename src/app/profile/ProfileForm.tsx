"use client";

import { useState } from "react";
import { User, Mail, Shield, Pencil } from "lucide-react";
import { api } from "@/lib/api";
import Toast from "@/components/ui/toast";

type Props = {
  user: {
    id: string;
    name: string;
    email: string;
    role?: string;
  };
};

export default function ProfileForm({ user }: Props) {
  const [name, setName] = useState(user.name);
  const [originalName, setOriginalName] = useState(user.name);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api("/api/users/profile", {
        method: "PUT",
        body: JSON.stringify({ name }),
      });

      setOriginalName(name);
      setIsEditing(false);
      setToast({ message: "Profile updated successfully", type: "success" });
    } catch (err: unknown) {
      setToast({
        message: (err as Error).message || "Something went wrong",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    setName(originalName);
    setIsEditing(false);
  };

  return (
    <>
      <form
        onSubmit={submit}
        className="
          max-w-2xl
          rounded-2xl
          border border-slate-800
          bg-linear-to-br from-slate-900 to-slate-950
          p-8 shadow-xl
        "
      >
        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-5">
            <div className="h-16 w-16 rounded-full bg-indigo-600 flex items-center justify-center text-xl font-bold text-white">
              {originalName.charAt(0).toUpperCase()}
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white">My Profile</h2>
              <p className="text-slate-400 text-sm">
                Manage your personal information
              </p>
            </div>
          </div>

          {!isEditing && (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="
                flex items-center gap-2
                rounded-lg border border-slate-700
                px-4 py-2 text-slate-300
                hover:bg-slate-800 transition
              "
            >
              <Pencil size={16} />
              Edit
            </button>
          )}
        </div>

        {/* NAME */}
        <div className="mb-6">
          <label className="text-slate-400 text-sm mb-2 block">Full Name</label>

          <div className="relative">
            <User className="absolute left-3 top-3.5 h-5 w-5 text-slate-500" />
            <input
              readOnly={!isEditing}
              className={`
                w-full rounded-lg bg-slate-900
                border border-slate-700
                py-3 pl-11 pr-4 text-white
                ${
                  isEditing
                    ? "focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    : "cursor-default"
                }
              `}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        {/* EMAIL */}
        <div className="mb-6">
          <label className="text-slate-400 text-sm mb-2 block">
            Email Address
          </label>

          <div className="relative">
            <Mail className="absolute left-3 top-3.5 h-5 w-5 text-slate-500" />
            <input
              readOnly
              className="
                w-full rounded-lg bg-slate-900
                border border-slate-800
                py-3 pl-11 pr-4 text-slate-400 cursor-default
              "
              value={user.email}
            />
          </div>
        </div>

        {/* ROLE */}
        <div className="mb-8">
          <label className="text-slate-400 text-sm mb-2 block">Role</label>

          <div className="relative">
            <Shield className="absolute left-3 top-3.5 h-5 w-5 text-slate-500" />
            <input
              readOnly
              className="
                w-full rounded-lg bg-slate-900
                border border-slate-800
                py-3 pl-11 pr-4
                text-slate-400 capitalize cursor-default
              "
              value={user.role || "user"}
            />
          </div>
        </div>

        {/* LINK TO CHANGE PASSWORD */}
        <a
          href="/login"
          className="text-sm text-indigo-400 hover:underline mt-4 block"
        >
          Want to change your password? Use “Forgot password” on login.
        </a>


        {/* ACTIONS */}
        {isEditing && (
          <div className="flex gap-4">
            <button
              type="button"
              onClick={cancelEdit}
              className="
                w-full rounded-xl
                border border-slate-700
                py-3 font-semibold text-slate-300
                hover:bg-slate-800 transition
              "
            >
              Cancel
            </button>

            <button
              disabled={loading}
              className="
                w-full rounded-xl
                bg-indigo-600 py-3
                font-semibold text-white
                hover:bg-indigo-500 transition
                disabled:opacity-50
              "
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        )}
      </form>

      {/* TOAST */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}
