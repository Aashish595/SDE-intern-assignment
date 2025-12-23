"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

type AuthFormState = {
  name?: string;
  email?: string;
  password?: string;
};

export default function AuthForm({ type }: { type: "login" | "register" }) {
  const [form, setForm] = useState<AuthFormState>({});
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"auth" | "reset">("auth");

  const router = useRouter();

  /* ---------------- AUTH SUBMIT ---------------- */
  const submitAuth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api(`/api/auth/${type}`, {
        method: "POST",
        body: JSON.stringify(form),
      });

      router.replace("/dashboard");
      router.refresh();
    } catch (err:unknown) {
      alert((err as Error).message || "Authentication failed");
      console.error((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- RESET SUBMIT ---------------- */
  const submitReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api("/api/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({ email: form.email }),
      });

      alert("Password reset email sent");
      setMode("auth");
    } catch (err) {
      alert("Failed to send reset email");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 px-4">
      <form
        onSubmit={mode === "auth" ? submitAuth : submitReset}
        className="w-full max-w-md rounded-2xl bg-slate-900/80 backdrop-blur border border-slate-800 shadow-xl p-8"
      >
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-indigo-500">
            {mode === "reset"
              ? "Reset Password"
              : type === "login"
              ? "Welcome Back"
              : "Create Account"}
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            {mode === "reset"
              ? "Enter your email to receive a reset link"
              : type === "login"
              ? "Login to access your dashboard"
              : "Register to get started"}
          </p>
        </div>

        {/* Fields */}
        <div className="space-y-5">
          {mode === "auth" && type === "register" && (
            <div>
              <label className="block text-sm text-slate-400 mb-1">Name</label>
              <input
                required
                className="w-full rounded-lg bg-slate-950 border border-slate-700 px-4 py-2 focus:outline-none focus:border-indigo-500"
                placeholder="John Doe"
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />
            </div>
          )}

          <div>
            <label className="block text-sm text-slate-400 mb-1">Email</label>
            <input
              required
              type="email"
              className="w-full rounded-lg bg-slate-950 border border-slate-700 px-4 py-2 focus:outline-none focus:border-indigo-500"
              placeholder="you@company.com"
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </div>

          {mode === "auth" && (
            <div>
              <label className="block text-sm text-slate-400 mb-1">
                Password
              </label>
              <input
                required
                type="password"
                className="w-full rounded-lg bg-slate-950 border border-slate-700 px-4 py-2 focus:outline-none focus:border-indigo-500"
                placeholder="••••••••"
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />
            </div>
          )}
        </div>

        {/* Button */}
        <button
          disabled={loading}
          className="mt-8 w-full rounded-lg bg-indigo-600 py-2.5 font-semibold text-white hover:bg-indigo-500 transition disabled:opacity-50"
        >
          {loading
            ? "Please wait..."
            : mode === "reset"
            ? "Send Reset Link"
            : type === "login"
            ? "Login"
            : "Register"}
        </button>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-slate-400 space-y-2">
          {type === "login" && mode === "auth" && (
            <button
              type="button"
              onClick={() => setMode("reset")}
              className="text-indigo-400 hover:underline"
            >
              Forgot password?
            </button>
          )}

          {mode === "reset" && (
            <button
              type="button"
              onClick={() => setMode("auth")}
              className="text-indigo-400 hover:underline block mx-auto"
            >
              Back to login
            </button>
          )}

          {mode === "auth" && (
            <>
              {type === "login" ? (
                <>
                  Don’t have an account?{" "}
                  <a href="/register" className="text-indigo-400 hover:underline">
                    Register
                  </a>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <a href="/login" className="text-indigo-400 hover:underline">
                    Login
                  </a>
                </>
              )}
            </>
          )}
        </div>
      </form>
    </section>
  );
}
