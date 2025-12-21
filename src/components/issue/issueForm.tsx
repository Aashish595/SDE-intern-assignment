"use client";
import { useState } from "react";
import { api } from "@/lib/api";

type IssueFormState = {
  type: "Cloud Security" | "Reteam Assessment" | "VAPT";
  title: string;
  description: string;
};

export default function IssueForm() {
  const [form, setForm] = useState<IssueFormState>({
    type: "Cloud Security",
    title: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const isValid =
    form.title.trim() !== "" &&
    form.description.trim() !== "";

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValid) return;

    try {
      setLoading(true);
      await api("/api/issues", {
        method: "POST",
        body: JSON.stringify(form),
      });

      setForm({
        type: "Cloud Security",
        title: "",
        description: "",
      });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      alert(err.message || "Failed to create issue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={submit}
      className="bg-slate-900 p-6 rounded-xl mb-6"
    >
      <h2 className="font-semibold mb-4">Create Issue</h2>

      <select
        className="input"
        value={form.type}
        onChange={(e) =>
          setForm({
            ...form,
            type: e.target.value as IssueFormState["type"],
          })
        }
      >
        <option>Cloud Security</option>
        <option>Reteam Assessment</option>
        <option>VAPT</option>
      </select>

      <input
        className="input"
        placeholder="Title"
        value={form.title}
        onChange={(e) =>
          setForm({ ...form, title: e.target.value })
        }
      />

      <textarea
        className="input"
        placeholder="Description"
        value={form.description}
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
      />

      <button
        disabled={!isValid || loading}
        className={`px-4 py-2 rounded-lg mt-3 ${
          isValid
            ? "bg-indigo-600 hover:bg-indigo-700"
            : "bg-slate-700 cursor-not-allowed"
        }`}
      >
        {loading ? "Creating..." : "Create Issue"}
      </button>
    </form>
  );
}
