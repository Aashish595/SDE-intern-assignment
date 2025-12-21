"use client";
import { api } from "@/lib/api";

type Issue = {
  _id: string;
  title: string;
  description: string;
  type: string;
};

export default function IssueCard({ issue }: { issue: Issue }) {
  const del = async () => {
    await api(`/api/issues/${issue._id}`, { method: "DELETE" });
    location.reload();
  };
  return (
    <div className="bg-slate-800 p-4 rounded-xl mb-3">
      <h3 className="font-semibold">{issue.title}</h3>
      <p className="text-sm text-slate-400">{issue.type}</p>

      <button onClick={del} className="text-red-400 text-sm mt-2">
        Delete
      </button>
    </div>
  );
}
