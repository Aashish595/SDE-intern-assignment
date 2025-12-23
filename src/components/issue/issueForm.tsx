"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { toast } from "sonner";

type Priority = "Critical" | "High" | "Medium" | "Low";

type IssueFormState = {
  type: "Cloud Security" | "Reteam Assessment" | "VAPT";
  title: string;
  description: string;
  priority: Priority;
};

type Props = {
  onClose: () => void;
  onCreated: () => void;
};

const PRIORITY_STYLES: Record<Priority, string> = {
  Critical: "bg-red-500",
  High: "bg-orange-500",
  Medium: "bg-yellow-400",
  Low: "bg-green-500",
};

export default function IssueForm({ onClose, onCreated }: Props) {
  const [form, setForm] = useState<IssueFormState>({
    type: "Cloud Security",
    title: "",
    description: "",
    priority: "Medium",
  });

  const [loading, setLoading] = useState(false);

  const isValid =
    form.title.trim().length > 0 &&
    form.description.trim().length > 0;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    try {
      setLoading(true);

      await api("/api/issues", {
        method: "POST",
        body: JSON.stringify(form),
      });

      toast.success("Issue created successfully");
      onCreated();
      onClose();
    } catch (err: unknown) {
      toast.error(
        err instanceof Error ? err.message : "Failed to create issue"
      );
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-2xl bg-linear-to-b from-slate-900 to-slate-950 border border-slate-800 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <h2 className="text-lg font-semibold text-white">
            Create Security Issue
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <form onSubmit={submit} className="px-6 py-5 space-y-5">
          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Issue Type */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Issue Type
              </label>
              <select
                value={form.type}
                onChange={(e) =>
                  setForm({
                    ...form,
                    type: e.target.value as IssueFormState["type"],
                  })
                }
                className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option>Cloud Security</option>
                <option>Reteam Assessment</option>
                <option>VAPT</option>
              </select>
            </div>

            {/* Priority */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Priority
              </label>
              <div className="relative">
                <span
                  className={`absolute left-3 top-1/2 -translate-y-1/2 h-3 w-3 rounded-full ${PRIORITY_STYLES[form.priority]}`}
                />
                <select
                  value={form.priority}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      priority: e.target.value as Priority,
                    })
                  }
                  className="w-full rounded-lg bg-slate-800 border border-slate-700 pl-9 pr-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Issue Title
            </label>
            <input
              type="text"
              placeholder="e.g. Public S3 bucket exposure"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
              className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Description
            </label>
            <textarea
              rows={5}
              placeholder="Describe impact, scope, reproduction steps, and evidence"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 text-white placeholder:text-slate-500 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 transition"
            >
              Cancel
            </button>

            <button
              disabled={!isValid || loading}
              className={`px-5 py-2 rounded-lg font-medium transition ${
                isValid
                  ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                  : "bg-slate-700 text-slate-400 cursor-not-allowed"
              }`}
            >
              {loading ? "Creating..." : "Create Issue"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
