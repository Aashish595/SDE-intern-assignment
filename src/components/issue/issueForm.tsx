"use client";
import { useState } from "react";
import { api } from "@/lib/api";

type IssueFormState = {
  type: "Cloud Security" | "Reteam Assessment" | "VAPT";
  title?: string;
  description?: string;
};

export default function IssueForm() {
  const [form, setForm] = useState<IssueFormState>({
    type: "Cloud Security",
  });

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await api("/api/issues", {
      method: "POST",
      body: JSON.stringify(form),
    });
    location.reload();
  };

  return (
    <form onSubmit={submit} className="bg-slate-900 p-6 rounded-xl mb-6">
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
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <textarea
        className="input"
        placeholder="Description"
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <button className="bg-indigo-600 px-4 py-2 rounded-lg mt-3">
        Create Issue
      </button>
    </form>
  );
}
