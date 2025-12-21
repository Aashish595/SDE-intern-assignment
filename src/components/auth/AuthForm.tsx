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
  const router = useRouter();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api(`/api/auth/${type}`, {
        method: "POST",
        body: JSON.stringify(form),
      });
      
      router.replace("/dashboard");
    } catch (err) {
      alert("Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-md rounded-2xl bg-slate-900/80 backdrop-blur border border-slate-800 shadow-xl p-8"
      >
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-indigo-500">
            {type === "login" ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            {type === "login"
              ? "Login to access your dashboard"
              : "Register to get started"}
          </p>
        </div>

        {/* Fields */}
        <div className="space-y-5">
          {type === "register" && (
            <div>
              <label className="block text-sm text-slate-400 mb-1">
                Name
              </label>
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
            <label className="block text-sm text-slate-400 mb-1">
              Email
            </label>
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
        </div>

        {/* Button */}
        <button
          disabled={loading}
          className="mt-8 w-full rounded-lg bg-indigo-600 py-2.5 font-semibold text-white hover:bg-indigo-500 transition disabled:opacity-50"
        >
          {loading
            ? "Please wait..."
            : type === "login"
            ? "Login"
            : "Register"}
        </button>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-slate-400">
          {type === "login" ? (
            <>
              Don’t have an account?{" "}
              <a
                href="/register"
                className="text-indigo-400 hover:underline"
              >
                Register
              </a>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <a
                href="/login"
                className="text-indigo-400 hover:underline"
              >
                Login
              </a>
            </>
          )}
        </p>
      </form>
    </section>
  );
}
