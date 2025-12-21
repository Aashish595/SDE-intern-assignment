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
    <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl mb-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg">
            {issue.title}
          </h3>
          <p className="text-sm text-slate-400">
            {issue.type}
          </p>
        </div>

        <button
          onClick={del}
          className="text-red-400 text-sm hover:underline"
        >
          Delete
        </button>
      </div>

      <p className="text-slate-300 mt-2 text-sm">
        {issue.description}
      </p>
    </div>
  );
}
