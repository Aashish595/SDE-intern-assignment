"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function ResetPasswordPage() {
  const params = useSearchParams();
  const token = params.get("token");
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setError("Invalid reset link");
      setChecking(false);
      return;
    }

    api("/api/auth/reset-password/verify", {
      method: "POST",
      body: JSON.stringify({ token }),
    })
      .then(() => setChecking(false))
      .catch((err) => {
        setError(
          err instanceof Error
            ? err.message
            : "Invalid or expired reset token"
        );
        setChecking(false);
      });
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api("/api/auth/reset-password/confirm", {
        method: "POST",
        body: JSON.stringify({ token, newPassword: password }),
      });

      router.replace("/login");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Password reset failed"
      );
    } finally {
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <p className="text-center mt-20 text-slate-400">
        Verifying reset link...
      </p>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl bg-slate-900 p-8 border border-slate-800"
      >
        <h1 className="text-2xl font-semibold text-white mb-6">
          Reset Password
        </h1>

        {error && (
          <p className="mb-4 text-sm text-red-500">
            {error}
          </p>
        )}

        <input
          type="password"
          required
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 text-white"
        />

        <button
          disabled={loading || !!error}
          className="w-full rounded-lg bg-indigo-600 py-3 text-white disabled:opacity-50"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}
